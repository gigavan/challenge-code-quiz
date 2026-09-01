const STORAGE_KEY="az900QuestV4",OLD_KEYS=["az900AdaptiveTrainerV3","az900AdaptiveTrainerV2"];
const DOMAINS=[{name:C,weight:[25,30]},{name:A,weight:[35,40]},{name:G,weight:[30,35]}];
const WORLDS=[
 {name:"Cloud Foundations",icon:"☁️",boss:"b06"},
 {name:"Compute Forge",icon:"⚙️",boss:"b05"},
 {name:"Network Frontier",icon:"🌐",boss:"b01"},
 {name:"Storage Vault",icon:"💾",boss:"b02"},
 {name:"Identity Citadel",icon:"🛡️",boss:"b04"},
 {name:"Governance Tower",icon:"🏛️",boss:"b03"}
];
const RANKS=["Cloud Recruit","Azure Explorer","Cloud Technician","Azure Operator","Cloud Engineer","Azure Specialist","Cloud Architect","Azure Vanguard"];
const ACHIEVEMENTS=[
 ["first","🚀","First Deployment","Complete your first study session"],
 ["streak7","🔥","Hot Streak","Reach a 7-day study streak"],
 ["repair5","🧠","False Confidence Destroyed","Repair 5 misconceptions"],
 ["feynman10","🧑‍🏫","Teach the Cloud","Complete 10 teach-back checkpoints"],
 ["network","🌐","Network Engineer Energy","Master the Network Frontier"],
 ["identity","🛡️","Zero Trust","Master the Identity Citadel"],
 ["boss3","👑","Boss Hunter","Defeat 3 world bosses"],
 ["exam90","🎓","No Guessing Required","Score 90%+ on Exam Simulation"],
 ["gauntlet80","⚔️","Overprepared","Score 80%+ in the Gauntlet"],
 ["mastery85","🏆","AZ-900 Ready","Reach 85% effective mastery"]
];

const defaultState=()=>({answered:0,correct:0,highConfidenceMisses:0,lastStudyDate:null,streak:0,streakShields:0,xp:0,
 concepts:{},confusions:[],history:[],achievements:[],bossWins:[],feynmanCount:0,repairs:0,daily:null});
let state=loadState(),session=null,selectedAnswer=null,examTimer=null,flashQueue=[],flashIndex=0,currentFlash=null;
const $=id=>document.getElementById(id);
const views=["dashboard-view","quiz-view","flashcard-view","feynman-view","results-view"];

function loadState(){
 try{
  let raw=localStorage.getItem(STORAGE_KEY);
  if(!raw){for(const k of OLD_KEYS){if(localStorage.getItem(k)){raw=localStorage.getItem(k);break}}}
  const old=raw?JSON.parse(raw):{};
  return {...defaultState(),...old,concepts:old.concepts||{},confusions:old.confusions||[],history:old.history||[],achievements:old.achievements||[],bossWins:old.bossWins||[]};
 }catch{return defaultState()}
}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}
function today(){return new Date().toISOString().slice(0,10)}
function days(a,b=Date.now()){return Math.max(0,(new Date(b)-new Date(a))/86400000)}
function showView(id){views.forEach(v=>$(v).classList.toggle("hidden",v!==id));window.scrollTo({top:0,behavior:"smooth"})}
function conceptState(c){
 if(!state.concepts[c])state.concepts[c]={attempts:0,correct:0,mastery:0,nextReview:0,interval:0,highConfidenceMisses:0,lastSeen:0};
 return state.concepts[c]
}
function effectiveMastery(c){
 const cs=conceptState(c); if(!cs.attempts)return 0;
 const age=cs.lastSeen?days(cs.lastSeen):0,decay=Math.max(0,age-5)*1.5;
 return Math.max(0,Math.round((cs.mastery||0)-decay))
}
function conceptStatus(c){const m=effectiveMastery(c),cs=conceptState(c);if(!cs.attempts)return"New";if(m>=85&&cs.interval>=7)return"Mastered";if(cs.nextReview&&cs.nextReview<=Date.now())return"Review";return"Learning"}
function allConcepts(){return [...new Set(QUESTION_BANK.filter(q=>q.difficulty!=="boss").map(q=>q.concept))]}
function overallMastery(){const a=allConcepts();return Math.round(a.reduce((s,c)=>s+effectiveMastery(c),0)/a.length)}
function domainMastery(d){const a=[...new Set(QUESTION_BANK.filter(q=>q.domain===d&&q.difficulty!=="boss").map(q=>q.concept))];return Math.round(a.reduce((s,c)=>s+effectiveMastery(c),0)/a.length)}
function worldMastery(w){const a=[...new Set(QUESTION_BANK.filter(q=>q.world===w&&q.difficulty!=="boss").map(q=>q.concept))];return a.length?Math.round(a.reduce((s,c)=>s+effectiveMastery(c),0)/a.length):0}
function dueCount(){return Object.values(state.concepts).filter(c=>c.attempts&&(!c.nextReview||c.nextReview<=Date.now())).length}
function readiness(){
 const weighted=DOMAINS.reduce((s,d)=>s+domainMastery(d.name)*((d.weight[0]+d.weight[1])/2),0)/DOMAINS.reduce((s,d)=>s+(d.weight[0]+d.weight[1])/2,0);
 const penalty=Math.min(18,state.highConfidenceMisses*1.5);return Math.max(0,Math.round(weighted-penalty))
}
function levelFromXP(xp=state.xp){return Math.floor(Math.sqrt(xp/90))+1}
function xpForLevel(l){return 90*(l-1)*(l-1)}
function xpForNext(l){return 90*l*l}
function rankForLevel(l){return RANKS[Math.min(RANKS.length-1,Math.floor((l-1)/4))]}
function addXP(n,why=""){if(n<=0)return;const before=levelFromXP();state.xp+=n;const after=levelFromXP();saveState();if(after>before)toast(`Level up! ${rankForLevel(after)} · Lv ${after}`);else if(why)toast(`+${n} XP · ${why}`)}
function toast(msg){$("toast").textContent=msg;$("toast").classList.remove("hidden");clearTimeout(toast.t);toast.t=setTimeout(()=>$("toast").classList.add("hidden"),2600)}
function updateStreak(){
 const t=today();if(state.lastStudyDate===t)return;
 if(state.lastStudyDate){
  const gap=Math.round(days(state.lastStudyDate,new Date(t)));
  if(gap===1)state.streak++;
  else if(gap===2&&state.streakShields>0){state.streakShields--;state.streak++}
  else state.streak=1;
 }else state.streak=1;
 state.lastStudyDate=t;
 if(state.streak>0&&state.streak%7===0)state.streakShields++;
}
function ensureDaily(){
 const t=today();
 if(!state.daily||state.daily.date!==t)state.daily={date:t,reviews:0,domains:[],repairs:0,feynman:0,complete:false};
}
function questDefs(){ensureDaily();return[
 ["Memory Jogger",state.daily.reviews,3,"Complete 3 spaced reviews"],
 ["Cloud Hopper",state.daily.domains.length,3,"Answer across all 3 exam domains"],
 ["Mental Model Repair",state.daily.repairs,1,"Repair 1 misconception"],
 ["Teach Azure",state.daily.feynman,1,"Complete 1 teach-back"]
]}
function checkDailyBonus(){ensureDaily();if(!state.daily.complete&&questDefs().every(q=>q[1]>=q[2])){state.daily.complete=true;addXP(150,"Daily quest bonus");toast("Daily quests complete · +150 XP")}}
function awardAchievement(id){if(state.achievements.includes(id))return;state.achievements.push(id);const a=ACHIEVEMENTS.find(x=>x[0]===id);if(a){addXP(75,`Achievement: ${a[2]}`);toast(`Achievement unlocked: ${a[2]}`)}}
function checkAchievements(lastMode=null,lastAccuracy=0){
 if(state.history.length)awardAchievement("first");
 if(state.streak>=7)awardAchievement("streak7");
 if(state.repairs>=5)awardAchievement("repair5");
 if(state.feynmanCount>=10)awardAchievement("feynman10");
 if(worldMastery("Network Frontier")>=85)awardAchievement("network");
 if(worldMastery("Identity Citadel")>=85)awardAchievement("identity");
 if(state.bossWins.length>=3)awardAchievement("boss3");
 if(lastMode==="exam"&&lastAccuracy>=90)awardAchievement("exam90");
 if(lastMode==="gauntlet"&&lastAccuracy>=80)awardAchievement("gauntlet80");
 if(overallMastery()>=85)awardAchievement("mastery85");
}
function priorityScore(q,hardBias=false){
 const cs=conceptState(q.concept),due=!cs.nextReview||cs.nextReview<=Date.now();
 return (100-effectiveMastery(q.concept))*2+(cs.highConfidenceMisses||0)*55+(due?35:0)+(cs.attempts===0?20:0)+(hardBias&&q.difficulty==="hard"?40:0)+Math.random()*10
}
function adaptiveQueue(count=12,weak=false){
 let pool=QUESTION_BANK.filter(q=>q.difficulty!=="boss").sort((a,b)=>priorityScore(b)-priorityScore(a)),out=[],used=[];
 while(out.length<count&&pool.length){let i=pool.findIndex(q=>!used.includes(q.domain));if(i<0){used=[];i=0}const q=pool.splice(i,1)[0];if(!weak||effectiveMastery(q.concept)<80||conceptState(q.concept).highConfidenceMisses)out.push(q);used.push(q.domain)}
 return out
}
function reviewQueue(count=12){
 const dueConcepts=new Set(Object.entries(state.concepts).filter(([,cs])=>cs.attempts&&(!cs.nextReview||cs.nextReview<=Date.now())).map(([c])=>c));
 let pool=QUESTION_BANK.filter(q=>dueConcepts.has(q.concept)&&q.difficulty!=="boss").sort((a,b)=>priorityScore(b)-priorityScore(a));
 if(pool.length<count)pool.push(...adaptiveQueue(count-pool.length,true).filter(q=>!pool.includes(q)));
 return pool.slice(0,count)
}
function examQueue(){
 const standard=QUESTION_BANK.filter(q=>q.difficulty==="standard"),hard=QUESTION_BANK.filter(q=>q.difficulty==="hard");
 const pick=(arr,n)=>arr.slice().sort(()=>Math.random()-.5).slice(0,n);
 return [...pick(standard.filter(q=>q.domain===C),11),...pick(standard.filter(q=>q.domain===A),14),...pick(standard.filter(q=>q.domain===G),12),...pick(hard,3)].sort(()=>Math.random()-.5)
}
function gauntletQueue(){
 const hard=QUESTION_BANK.filter(q=>q.difficulty==="hard"),boss=QUESTION_BANK.filter(q=>q.difficulty==="boss");
 const base=[...hard,...hard,...boss].sort(()=>Math.random()-.5);
 return base.slice(0,30)
}
function bossQueue(world){
 const boss=QUESTION_BANK.find(q=>q.difficulty==="boss"&&q.world===world);
 const related=QUESTION_BANK.filter(q=>q.world===world&&q.difficulty!=="boss").sort((a,b)=>priorityScore(b,true)-priorityScore(a,true)).slice(0,5);
 return [...related,boss].sort(()=>Math.random()-.5)
}
function renderDashboard(){
 ensureDaily();const l=levelFromXP(),start=xpForLevel(l),next=xpForNext(l),pct=Math.max(0,Math.min(100,(state.xp-start)/(next-start)*100));
 $("level-pill").textContent=`Lv ${l}`;$("xp-pill").textContent=`${state.xp} XP`;$("streak").textContent=`${state.streak||0} day${state.streak===1?"":"s"} streak`;
 $("xp-bar").style.width=`${pct}%`;$("rank-text").textContent=`${rankForLevel(l)} · ${next-state.xp} XP to level ${l+1}`;
 $("overall-mastery").textContent=overallMastery()+"%";$("readiness").textContent=readiness()+"%";$("due-review").textContent=dueCount();$("high-confidence-misses").textContent=state.highConfidenceMisses;
 $("focus-shield").textContent=(session?.shield??100)+"%";$("streak-shields").textContent=state.streakShields||0;
 $("daily-quests").innerHTML=questDefs().map(([name,v,t,desc])=>`<div class="quest-card ${v>=t?"complete":""}"><div class="quest-top"><strong>${name}</strong><span>${Math.min(v,t)} / ${t}</span></div><p class="muted tiny">${desc}</p><div class="quest-progress"><div style="width:${Math.min(100,v/t*100)}%"></div></div></div>`).join("");
 $("quest-bonus").textContent=state.daily.complete?"Bonus claimed ✓":"+150 XP bonus";
 $("world-map").innerHTML=WORLDS.map(w=>{const m=worldMastery(w.name),unlocked=m>=55||state.bossWins.includes(w.name);const concepts=[...new Set(QUESTION_BANK.filter(q=>q.world===w.name&&q.difficulty!=="boss").map(q=>q.concept))].slice(0,7);
 return `<article class="world-card ${unlocked?"":"locked"}"><p class="eyebrow">${w.icon} ${m}% mastery</p><h4>${w.name}</h4><div class="world-progress">${unlocked?"Boss unlocked":"Boss unlocks at 55% mastery"}</div><div class="world-nodes">${concepts.map(c=>`<span class="node ${conceptStatus(c).toLowerCase()}">${esc(c)}</span>`).join("")}</div><button class="boss-btn" data-world="${esc(w.name)}" ${unlocked?"":"disabled"}>${state.bossWins.includes(w.name)?"Replay Boss":"Challenge Boss"}</button></article>`}).join("");
 document.querySelectorAll(".boss-btn").forEach(b=>b.addEventListener("click",()=>startSession("boss",bossQueue(b.dataset.world),b.dataset.world)));
 const weak=allConcepts().sort((a,b)=>(conceptState(b).highConfidenceMisses-conceptState(a).highConfidenceMisses)||(effectiveMastery(a)-effectiveMastery(b)));
 const plan=[];if(dueCount())plan.push(`Clear ${Math.min(3,dueCount())} due spaced reviews before new material.`);if(state.highConfidenceMisses)plan.push(`Attack confident misses first; false certainty is your highest-priority weakness.`);plan.push(`Interleave all three exam domains instead of blocking one topic for too long.`);plan.push(`Finish with a teach-back on ${weak[0]||"your weakest concept"}.`);$("study-plan").innerHTML=plan.map(x=>`<li>${x}</li>`).join("");
 $("domain-mastery").innerHTML=DOMAINS.map(d=>{const m=domainMastery(d.name);return `<div class="domain-row"><div class="domain-row-top"><strong>${d.name}</strong><span>${m}% · ${d.weight[0]}–${d.weight[1]}%</span></div><div class="meter"><div style="width:${m}%"></div></div></div>`}).join("");
 const counts={New:0,Learning:0,Review:0,Mastered:0};allConcepts().forEach(c=>counts[conceptStatus(c)]++);$("state-summary").innerHTML=Object.entries(counts).map(([k,v])=>`<div class="state-card"><span class="muted">${k}</span><strong>${v}</strong></div>`).join("");
 const issues=weak.filter(c=>conceptState(c).attempts||conceptState(c).highConfidenceMisses).slice(0,6);$("misconception-list").innerHTML=issues.length?issues.map(c=>{const cs=conceptState(c),note=state.confusions.filter(x=>x.concept===c).slice(-1)[0];return `<div class="misconception-item"><strong>${esc(c)}</strong><span class="muted">Effective mastery ${effectiveMastery(c)}%${cs.highConfidenceMisses?` · ${cs.highConfidenceMisses} confident miss${cs.highConfidenceMisses===1?"":"es"}`:""}</span>${note?`<p class="muted tiny">Your note: ${esc(note.note)}</p>`:""}</div>`}).join(""):`<p class="muted">No misconceptions logged yet. The engine will surface them as you study.</p>`;
 $("achievements").innerHTML=ACHIEVEMENTS.map(a=>`<div class="achievement ${state.achievements.includes(a[0])?"":"locked"}"><span class="icon">${a[1]}</span><strong>${a[2]}</strong><span class="muted tiny">${a[3]}</span></div>`).join("");
 saveState()
}
function startSession(mode,queue=null,bossWorld=null){
 updateStreak();ensureDaily();clearInterval(examTimer);
 const cfg={learn:["Learn Mode","Adaptive learning",12],review:["Review Due","Spaced repetition",12],exam:["Exam Simulation","Representative difficulty",40],gauntlet:["Gauntlet","Harder than AZ-900",30],boss:["Boss Battle",bossWorld||"World Boss",6],weak:["Weakness Drill","Attack weak concepts",12]}[mode];
 let q=queue||(mode==="learn"?adaptiveQueue(12):mode==="review"?reviewQueue(12):mode==="exam"?examQueue():mode==="gauntlet"?gauntletQueue():adaptiveQueue(12,true));
 session={mode,queue:q,index:0,correct:0,conf:[],xp:0,shield:100,reviews:0,improved:new Set(),bossWorld,answers:[],started:Date.now(),timedOut:false};
 $("mode-label").textContent=cfg[0];$("session-title").textContent=cfg[1];$("timer-pill").classList.toggle("hidden",!["exam","gauntlet"].includes(mode));
 if(mode==="exam")startTimer(45*60);if(mode==="gauntlet")startTimer(35*60);showView("quiz-view");renderQuestion()
}
function startTimer(seconds){let remain=seconds;const paint=()=>{$("timer-pill").textContent=`${String(Math.floor(remain/60)).padStart(2,"0")}:${String(remain%60).padStart(2,"0")}`;if(remain<=0){clearInterval(examTimer);session.timedOut=true;finishSession()}remain--};paint();examTimer=setInterval(paint,1000)}
function renderQuestion(){
 if(session.index>=session.queue.length)return maybeFeynman();
 selectedAnswer=null;const q=session.queue[session.index];
 $("progress-text").textContent=`${session.index+1} / ${session.queue.length}`;$("session-score").textContent=`${session.correct} correct`;$("shield-pill").textContent=`Shield ${session.shield}%`;$("progress-bar").style.width=`${session.index/session.queue.length*100}%`;
 $("difficulty-tag").textContent=q.difficulty==="boss"?"BOSS":q.difficulty==="hard"?"HARD":"STANDARD";$("domain-tag").textContent=q.domain;$("concept-tag").textContent=q.concept;$("question-text").textContent=q.q;
 $("generation-prompt").textContent=session.mode==="exam"?"Exam mode: no feedback until the end.":session.mode==="gauntlet"?"Close distractors. Read every constraint.":"Commit to an answer before seeing feedback.";
 $("answers").innerHTML=q.options.map((o,i)=>`<button class="answer-btn" data-i="${i}">${String.fromCharCode(65+i)}. ${esc(o)}</button>`).join("");
 $("confidence-panel").classList.add("hidden");$("feedback-panel").className="feedback-panel hidden";$("confusion-box").classList.add("hidden");$("transfer-box").classList.add("hidden");$("confusion-input").value="";$("xp-earned").textContent="";
 document.querySelectorAll(".answer-btn").forEach(b=>b.addEventListener("click",()=>selectAnswer(Number(b.dataset.i))))
}
function selectAnswer(i){selectedAnswer=i;document.querySelectorAll(".answer-btn").forEach((b,n)=>b.classList.toggle("selected",n===i));if(["exam","gauntlet"].includes(session.mode))submitAnswer(null);else $("confidence-panel").classList.remove("hidden")}
function submitAnswer(confidence){
 if(selectedAnswer===null)return;const q=session.queue[session.index],correct=selectedAnswer===q.answer,cs=conceptState(q.concept),before=effectiveMastery(q.concept);
 session.answers.push({id:q.id,chosen:selectedAnswer,correct,confidence});if(correct)session.correct++;state.answered++;if(correct)state.correct++;
 if(confidence)session.conf.push(confidence);updateConcept(q,correct,confidence);const after=effectiveMastery(q.concept);if(after>before)session.improved.add(q.concept);
 ensureDaily();if(!state.daily.domains.includes(q.domain))state.daily.domains.push(q.domain);
 if(session.mode==="review"){state.daily.reviews++;session.reviews++}
 let earned=0;
 if(!["exam","gauntlet"].includes(session.mode)){
  earned=correct?(confidence===3?15:confidence===2?12:10):0;
  if(correct&&cs.attempts>1&&before<60)earned+=8;if(q.difficulty==="hard"&&correct)earned+=8;if(q.difficulty==="boss"&&correct)earned+=15;
  if(!correct){session.shield=Math.max(0,session.shield-(confidence===3?18:confidence===2?11:7));if(confidence===3){state.highConfidenceMisses++;cs.highConfidenceMisses=(cs.highConfidenceMisses||0)+1}}
  else session.shield=Math.min(100,session.shield+2);
  session.xp+=earned;addXP(earned,"retrieval");
 }
 state.history.push({date:Date.now(),id:q.id,concept:q.concept,correct,confidence,mode:session.mode});if(state.history.length>500)state.history=state.history.slice(-500);saveState();checkDailyBonus();
 if(["exam","gauntlet"].includes(session.mode)){session.index++;return renderQuestion()}
 revealFeedback(q,correct,confidence,earned)
}
function updateConcept(q,correct,confidence){
 const cs=conceptState(q.concept);cs.attempts++;if(correct)cs.correct++;cs.lastSeen=Date.now();
 let delta=correct?14:-12;if(confidence===3)delta+=correct?5:-9;if(q.difficulty==="hard")delta+=correct?3:-2;if(q.difficulty==="boss")delta+=correct?5:-3;
 cs.mastery=Math.max(0,Math.min(100,(cs.mastery||0)+delta));
 if(correct){cs.interval=cs.interval?Math.min(30,Math.max(1,Math.round(cs.interval*(confidence===3?2.1:confidence===2?1.7:1.3)))):1}else cs.interval=confidence===3?0.25:0.5;
 cs.nextReview=Date.now()+cs.interval*86400000
}
function revealFeedback(q,correct,confidence,earned){
 document.querySelectorAll(".answer-btn").forEach((b,n)=>{b.disabled=true;if(n===q.answer)b.classList.add("correct");if(n===selectedAnswer&&!correct)b.classList.add("incorrect")});
 $("confidence-panel").classList.add("hidden");$("feedback-panel").className=`feedback-panel ${correct?"success":"error"}`;$("feedback-title").textContent=correct?"Retrieved correctly":"Good miss — now repair the model";$("feedback-text").textContent=q.explanation;$("xp-earned").textContent=earned?`+${earned} XP`:"No XP for the answer — recover XP by repairing the misconception.";
 if(!correct)$("confusion-box").classList.remove("hidden");$("transfer-box").classList.remove("hidden");$("transfer-text").textContent=q.transfer
}
document.querySelectorAll("[data-confidence]").forEach(b=>b.addEventListener("click",()=>submitAnswer(Number(b.dataset.confidence))));
$("save-confusion").addEventListener("click",()=>{const q=session.queue[session.index],note=$("confusion-input").value.trim();if(!note)return toast("Write what made the wrong answer seem right.");state.confusions.push({date:Date.now(),concept:q.concept,note});state.repairs++;ensureDaily();state.daily.repairs++;session.shield=Math.min(100,session.shield+12);session.xp+=25;addXP(25,"misconception repaired");$("shield-pill").textContent=`Shield ${session.shield}%`;$("save-confusion").disabled=true;$("save-confusion").textContent="Repaired ✓";checkDailyBonus();checkAchievements()});
$("next-question").addEventListener("click",()=>{session.index++;renderQuestion()});
function maybeFeynman(){clearInterval(examTimer);if(["exam","gauntlet"].includes(session.mode))return finishSession();const weakest=session.queue.slice().sort((a,b)=>effectiveMastery(a.concept)-effectiveMastery(b.concept))[0];session.feynman=weakest;showView("feynman-view");$("feynman-prompt").textContent=`Explain ${weakest.concept}: what it is, why it matters, and one situation where you'd use it.`;$("feynman-answer").value="";$("feynman-key").classList.add("hidden");$("finish-feynman").classList.add("hidden");$("show-feynman-key").classList.remove("hidden")}
$("show-feynman-key").addEventListener("click",()=>{const q=session.feynman,txt=$("feynman-answer").value.trim();$("feynman-key").innerHTML=`<strong>Key idea to compare against</strong><p>${esc(q.explanation)}</p><p class="muted">Transfer: ${esc(q.transfer)}</p>${txt.length<50?`<p class="muted">Your explanation is very short. Try adding the why and a use case before continuing.</p>`:""}`;$("feynman-key").classList.remove("hidden");$("finish-feynman").classList.remove("hidden")});
$("finish-feynman").addEventListener("click",()=>{state.feynmanCount++;ensureDaily();state.daily.feynman++;session.xp+=25;addXP(25,"teach-back completed");checkDailyBonus();checkAchievements();finishSession()});
function finishSession(){
 clearInterval(examTimer);if(!session)return;const accuracy=Math.round(session.correct/Math.max(1,session.queue.length)*100);
 if(["exam","gauntlet"].includes(session.mode)){
  const base=session.mode==="gauntlet"?Math.round(accuracy*1.5):Math.round(accuracy);session.xp+=base;addXP(base,session.mode==="gauntlet"?"Gauntlet completion":"Exam completion");
 }
 if(session.mode==="boss"&&accuracy>=80&&session.bossWorld&&!state.bossWins.includes(session.bossWorld)){state.bossWins.push(session.bossWorld);session.xp+=120;addXP(120,`${session.bossWorld} boss defeated`)}
 state.history.push({date:Date.now(),type:"session",mode:session.mode,accuracy});checkAchievements(session.mode,accuracy);saveState();
 $("results-heading").textContent=session.mode==="gauntlet"?(accuracy>=80?"You survived the Gauntlet.":"The Gauntlet found weaknesses."):session.mode==="boss"?(accuracy>=80?"Boss defeated.":"Boss survived. Train and return."):accuracy>=85?"Strong session.":"Useful session — weaknesses exposed.";
 $("results-summary").textContent=session.timedOut?`Time expired. You finished with ${accuracy}% accuracy.`:`${session.correct} of ${session.queue.length} correct. ${session.mode==="gauntlet"?"These questions intentionally exceed typical AZ-900 difficulty.":""}`;
 $("result-accuracy").textContent=accuracy+"%";$("result-xp").textContent=session.xp;$("result-shield").textContent=session.shield+"%";$("result-review").textContent=session.reviews||session.queue.length;
 showView("results-view")
}
function startFlashcards(){
 updateStreak();ensureDaily();const due=new Set(Object.entries(state.concepts).filter(([,c])=>c.attempts&&(!c.nextReview||c.nextReview<=Date.now())).map(([k])=>k));
 let pool=QUESTION_BANK.filter(q=>q.difficulty!=="boss"&&(due.has(q.concept)||effectiveMastery(q.concept)<70));if(pool.length<12)pool=QUESTION_BANK.filter(q=>q.difficulty!=="boss");
 flashQueue=pool.sort((a,b)=>priorityScore(b)-priorityScore(a)).slice(0,15);flashIndex=0;showView("flashcard-view");renderFlash()
}
function renderFlash(){
 if(flashIndex>=flashQueue.length){state.history.push({date:Date.now(),type:"flashcards",count:flashQueue.length});awardAchievement("first");saveState();renderDashboard();return showView("dashboard-view")}
 currentFlash=flashQueue[flashIndex];$("flash-progress").textContent=`${flashIndex+1} / ${flashQueue.length}`;$("flash-concept").textContent=currentFlash.concept;$("flash-front").textContent=currentFlash.q;$("flash-back").classList.add("hidden");$("flash-ratings").classList.add("hidden");$("reveal-card").classList.remove("hidden")
}
$("reveal-card").addEventListener("click",()=>{$("flash-back").innerHTML=`<strong>${esc(currentFlash.options[currentFlash.answer])}</strong><p>${esc(currentFlash.explanation)}</p>`;$("flash-back").classList.remove("hidden");$("flash-ratings").classList.remove("hidden");$("reveal-card").classList.add("hidden")});
document.querySelectorAll("[data-rating]").forEach(b=>b.addEventListener("click",()=>{const cs=conceptState(currentFlash.concept),r=b.dataset.rating,map={again:[0.25,-7,3],hard:[1,1,7],good:[3,5,12],easy:[7,9,18]},[interval,delta,xp]=map[r];cs.attempts++;cs.lastSeen=Date.now();cs.mastery=Math.max(0,Math.min(100,(cs.mastery||0)+delta));cs.interval=interval;cs.nextReview=Date.now()+interval*86400000;state.answered++;ensureDaily();state.daily.reviews++;addXP(xp,`flashcard ${r}`);checkDailyBonus();saveState();flashIndex++;renderFlash()}));
$("start-learn").addEventListener("click",()=>startSession("learn"));$("start-review").addEventListener("click",()=>startSession("review"));$("start-flashcards").addEventListener("click",startFlashcards);$("start-exam").addEventListener("click",()=>startSession("exam"));$("start-gauntlet").addEventListener("click",()=>startSession("gauntlet"));
$("return-dashboard").addEventListener("click",()=>{renderDashboard();showView("dashboard-view")});$("retry-weak").addEventListener("click",()=>startSession("weak"));
$("reset-progress").addEventListener("click",()=>{if(confirm("Reset all AZ-900 Quest progress, XP, mastery and achievements?")){localStorage.removeItem(STORAGE_KEY);OLD_KEYS.forEach(k=>localStorage.removeItem(k));state=defaultState();renderDashboard()}});
renderDashboard();
