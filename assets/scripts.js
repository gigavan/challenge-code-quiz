const QUESTION_BANK = [
  {
    id:"cloud-opex", domain:"Cloud concepts", concept:"CapEx vs OpEx",
    q:"A company wants to avoid large upfront hardware purchases and instead pay monthly for the cloud resources it consumes. Which financial model best describes this?",
    options:["Capital expenditure (CapEx)","Operational expenditure (OpEx)","Depreciation-only accounting","Sunk-cost accounting"], answer:1,
    explanation:"Cloud consumption is commonly associated with operational expenditure because spending is tied to ongoing usage rather than a large upfront infrastructure purchase.",
    transfer:"If demand doubles for only one month, which model makes it easier to scale spending up temporarily and then back down?"
  },
  {
    id:"cloud-shared", domain:"Cloud concepts", concept:"Shared responsibility",
    q:"In an Azure virtual machine, who is generally responsible for patching the guest operating system?",
    options:["Microsoft only","The customer","The internet service provider","The hardware manufacturer"], answer:1,
    explanation:"For IaaS virtual machines, Microsoft secures the physical infrastructure, while the customer is responsible for the guest OS, applications, data, identities, and configuration.",
    transfer:"How would this responsibility change if the workload moved from an Azure VM to a fully managed SaaS application?"
  },
  {
    id:"cloud-public", domain:"Cloud concepts", concept:"Cloud models",
    q:"Which cloud model provides computing resources over infrastructure shared across multiple organizations while the cloud provider owns and operates the physical hardware?",
    options:["Private cloud","Public cloud","On-premises datacenter","Air-gapped edge only"], answer:1,
    explanation:"A public cloud uses provider-owned infrastructure offered to many customers, with logical isolation between tenants.",
    transfer:"Which model would an organization choose if it wanted cloud-style management but dedicated infrastructure under its own control?"
  },
  {
    id:"cloud-scale", domain:"Cloud concepts", concept:"Scalability and elasticity",
    q:"An online store automatically adds compute resources during a flash sale and removes them afterward. Which cloud characteristic is being demonstrated most directly?",
    options:["Elasticity","Data sovereignty","Capital depreciation","Fault domain isolation"], answer:0,
    explanation:"Elasticity is the ability to dynamically add or remove resources as demand changes.",
    transfer:"If the store permanently upgraded to larger servers because its normal workload grew, would that be elasticity or scaling?"
  },
  {
    id:"arch-region", domain:"Azure architecture and services", concept:"Regions and availability zones",
    q:"A company wants an Azure application to remain available if a single datacenter in an Azure region fails. Which design is the best fit?",
    options:["Deploy resources across Availability Zones","Use only one larger virtual machine","Place all resources in one resource group","Use a management group"], answer:0,
    explanation:"Availability Zones are physically separate datacenter groupings within a region and are designed to improve resiliency against datacenter-level failures.",
    transfer:"If the requirement instead covered the loss of an entire Azure region, what larger geographic design decision would you need to consider?"
  },
  {
    id:"arch-rg", domain:"Azure architecture and services", concept:"Resource groups",
    q:"What is the primary purpose of an Azure resource group?",
    options:["Provide a logical container for related Azure resources","Create a private network connection to Azure","Replace Microsoft Entra ID","Guarantee cross-region disaster recovery"], answer:0,
    explanation:"A resource group is a logical container used to organize and manage related Azure resources.",
    transfer:"Could resources in one resource group be located in different Azure regions?"
  },
  {
    id:"arch-vnet", domain:"Azure architecture and services", concept:"Virtual networks",
    q:"Which Azure service provides a logically isolated private network for Azure resources?",
    options:["Azure Virtual Network","Azure Policy","Azure Monitor","Microsoft Purview"], answer:0,
    explanation:"Azure Virtual Network (VNet) provides private IP addressing, subnets, routing, and network isolation for Azure resources.",
    transfer:"What feature would you use to divide a VNet into smaller address ranges for different application tiers?"
  },
  {
    id:"arch-expressroute", domain:"Azure architecture and services", concept:"ExpressRoute vs VPN Gateway",
    q:"A bank requires a private connection from its on-premises network to Azure that does not traverse the public internet. Which service best matches the requirement?",
    options:["Azure VPN Gateway","Azure ExpressRoute","Azure DNS","Azure Traffic Manager"], answer:1,
    explanation:"ExpressRoute provides private connectivity between on-premises infrastructure and Microsoft cloud services through a connectivity provider. A VPN Gateway uses encrypted tunnels over the public internet.",
    transfer:"If the company instead wanted a lower-cost encrypted site-to-site connection over the public internet, which service would fit better?"
  },
  {
    id:"arch-storage", domain:"Azure architecture and services", concept:"Storage redundancy",
    q:"Which Azure Storage redundancy option keeps synchronous copies across separate Availability Zones within the primary region?",
    options:["LRS","ZRS","GRS","RA-GRS"], answer:1,
    explanation:"Zone-redundant storage (ZRS) synchronously replicates data across Availability Zones in the primary region.",
    transfer:"Which family of redundancy options would you consider if the requirement included replication to a secondary Azure region?"
  },
  {
    id:"arch-serverless", domain:"Azure architecture and services", concept:"Serverless compute",
    q:"Which Azure service is designed to run event-driven code without requiring you to manage virtual machines?",
    options:["Azure Functions","Azure Virtual Machines","Azure Dedicated Host","Azure Virtual Desktop"], answer:0,
    explanation:"Azure Functions is a serverless compute service for running event-driven code while Azure manages the underlying infrastructure.",
    transfer:"What would make an Azure VM a better choice than Functions for a workload?"
  },
  {
    id:"arch-appservice", domain:"Azure architecture and services", concept:"PaaS compute",
    q:"A team wants to host a web application without managing the underlying operating system. Which Azure service is designed for this scenario?",
    options:["Azure App Service","Azure Virtual Machines","Azure ExpressRoute","Azure Files"], answer:0,
    explanation:"Azure App Service is a managed platform for hosting web applications and APIs without requiring the customer to manage the underlying OS.",
    transfer:"Compared with a VM, which layer of management responsibility is reduced when using App Service?"
  },
  {
    id:"arch-entra", domain:"Azure architecture and services", concept:"Microsoft Entra ID",
    q:"Which service is Azure's cloud-based identity and access management service for users, groups, and applications?",
    options:["Microsoft Entra ID","Azure Load Balancer","Azure Backup","Azure Advisor"], answer:0,
    explanation:"Microsoft Entra ID is Microsoft's cloud identity and access management service.",
    transfer:"Which authorization feature would you combine with Entra identities to control what a user can do to Azure resources?"
  },
  {
    id:"gov-rbac", domain:"Azure management and governance", concept:"Azure RBAC",
    q:"An administrator needs to let a user restart virtual machines but should not give that user full control of the subscription. What should the administrator use?",
    options:["Azure role-based access control (RBAC)","Azure DNS","Availability Zones","Azure Front Door"], answer:0,
    explanation:"Azure RBAC provides fine-grained authorization by assigning roles to security principals at scopes such as a resource, resource group, subscription, or management group.",
    transfer:"Why is assigning the narrowest appropriate role and scope considered a good security practice?"
  },
  {
    id:"gov-policy", domain:"Azure management and governance", concept:"Azure Policy",
    q:"An organization wants to require every new Azure resource to use approved regions and specific tags. Which service should it use?",
    options:["Azure Policy","Azure Functions","Azure Bastion","Azure Queue Storage"], answer:0,
    explanation:"Azure Policy evaluates resources against organizational rules and can audit, deny, modify, or remediate configurations depending on the policy effect.",
    transfer:"How is Azure Policy different from RBAC even though both are governance tools?"
  },
  {
    id:"gov-lock", domain:"Azure management and governance", concept:"Resource locks",
    q:"Which Azure feature can help prevent an administrator from accidentally deleting a critical resource?",
    options:["Resource lock","Network security group","Cost alert","Availability set"], answer:0,
    explanation:"A CanNotDelete resource lock can prevent deletion of a resource even when a user otherwise has permission to delete it.",
    transfer:"Would a resource lock replace RBAC permissions, or does it add another control layer?"
  },
  {
    id:"gov-cost", domain:"Azure management and governance", concept:"Cost Management",
    q:"Which Azure capability is intended to analyze cloud spending, create budgets, and monitor cost trends?",
    options:["Microsoft Cost Management","Azure DNS","Microsoft Entra Domain Services","Azure Load Balancer"], answer:0,
    explanation:"Microsoft Cost Management provides tools for analyzing, allocating, monitoring, and optimizing cloud costs, including budgets and alerts.",
    transfer:"What would a budget alert tell you that a service-health alert would not?"
  },
  {
    id:"gov-advisor", domain:"Azure management and governance", concept:"Azure Advisor",
    q:"Which Azure service provides personalized recommendations for areas such as cost, reliability, security, operational excellence, and performance?",
    options:["Azure Advisor","Azure Queue Storage","Azure VPN Gateway","Azure DevTest Labs"], answer:0,
    explanation:"Azure Advisor analyzes deployed resources and provides recommendations to help improve cost, performance, reliability, security, and operational excellence.",
    transfer:"Would Advisor automatically become the enforcement mechanism for a mandatory company rule, or would Azure Policy be more appropriate?"
  },
  {
    id:"gov-monitor", domain:"Azure management and governance", concept:"Azure Monitor",
    q:"Which Azure service is the central platform for collecting, analyzing, and acting on telemetry from Azure and other environments?",
    options:["Azure Monitor","Azure Resource Manager","Azure Files","Azure ExpressRoute"], answer:0,
    explanation:"Azure Monitor collects and analyzes metrics, logs, traces, and other telemetry so you can understand resource health and performance and create alerts.",
    transfer:"If CPU usage stays above a threshold, which Azure capability would you configure to notify an operations team?"
  }
];

const STORAGE_KEY = "az900AdaptiveTrainerV2";
const DOMAINS = [
  {name:"Cloud concepts", weight:"25–30%"},
  {name:"Azure architecture and services", weight:"35–40%"},
  {name:"Azure management and governance", weight:"30–35%"}
];

const defaultState = () => ({
  answered:0, correct:0, highConfidenceMisses:0, lastStudyDate:null, streak:0,
  concepts:{}, confusions:[], history:[]
});

let state = loadState();
let session = null;
let selectedAnswer = null;

const $ = (id) => document.getElementById(id);
const views = ["dashboard-view","quiz-view","feynman-view","results-view"];

function loadState(){
  try { return {...defaultState(), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {})}; }
  catch { return defaultState(); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function showView(id){ views.forEach(v => $(v).classList.toggle("hidden", v !== id)); window.scrollTo({top:0,behavior:"smooth"}); }
function conceptState(concept){
  if(!state.concepts[concept]) state.concepts[concept] = {attempts:0,correct:0,mastery:0,nextReview:0,interval:0,highConfidenceMisses:0};
  return state.concepts[concept];
}
function daysBetween(a,b){ return Math.floor((new Date(b)-new Date(a))/86400000); }
function updateStreak(){
  const today = new Date().toISOString().slice(0,10);
  if(state.lastStudyDate === today) return;
  if(state.lastStudyDate && daysBetween(state.lastStudyDate,today) === 1) state.streak += 1;
  else state.streak = 1;
  state.lastStudyDate = today;
}
function masteryFor(concept){
  const cs = state.concepts[concept];
  return cs ? Math.round(cs.mastery || 0) : 0;
}
function overallMastery(){
  const concepts = [...new Set(QUESTION_BANK.map(q=>q.concept))];
  return Math.round(concepts.reduce((sum,c)=>sum+masteryFor(c),0)/concepts.length);
}
function dueCount(){
  const now=Date.now();
  return Object.values(state.concepts).filter(c=>c.attempts && (!c.nextReview || c.nextReview<=now)).length;
}
function domainMastery(name){
  const concepts=[...new Set(QUESTION_BANK.filter(q=>q.domain===name).map(q=>q.concept))];
  return Math.round(concepts.reduce((s,c)=>s+masteryFor(c),0)/concepts.length);
}
function priorityScore(q){
  const cs=conceptState(q.concept), due = !cs.nextReview || cs.nextReview<=Date.now();
  return (100-(cs.mastery||0))*2 + (cs.highConfidenceMisses||0)*45 + (due?35:0) + (cs.attempts===0?20:0) + Math.random()*8;
}
function buildAdaptiveQueue(count=10, weakOnly=false){
  const pool=[...QUESTION_BANK].sort((a,b)=>priorityScore(b)-priorityScore(a));
  let result=[], usedDomains=[];
  while(result.length<count && pool.length){
    let idx=pool.findIndex(q=>!usedDomains.includes(q.domain));
    if(idx<0){ usedDomains=[]; idx=0; }
    const q=pool.splice(idx,1)[0];
    if(!weakOnly || masteryFor(q.concept)<80 || conceptState(q.concept).highConfidenceMisses>0) result.push(q);
    usedDomains.push(q.domain);
  }
  if(result.length<count && weakOnly){
    QUESTION_BANK.filter(q=>!result.includes(q)).sort((a,b)=>priorityScore(b)-priorityScore(a)).slice(0,count-result.length).forEach(q=>result.push(q));
  }
  return result;
}
function renderDashboard(){
  $("overall-mastery").textContent=overallMastery()+"%";
  $("questions-answered").textContent=state.answered;
  $("due-review").textContent=dueCount();
  $("high-confidence-misses").textContent=state.highConfidenceMisses;
  $("streak").textContent=`${state.streak || 0} day${state.streak===1?"":"s"} streak`;

  const weak = QUESTION_BANK.map(q=>q.concept).filter((c,i,a)=>a.indexOf(c)===i)
    .sort((a,b)=>(conceptState(b).highConfidenceMisses-conceptState(a).highConfidenceMisses)||(masteryFor(a)-masteryFor(b)));
  const plan=[];
  if(dueCount()) plan.push(`Start with ${Math.min(dueCount(),3)} spaced-repetition reviews that are due now.`);
  if(state.highConfidenceMisses) plan.push(`Prioritize ${Math.min(state.highConfidenceMisses,3)} high-confidence miss${state.highConfidenceMisses===1?"":"es"} to correct false certainty.`);
  plan.push(`Interleave questions across all three AZ-900 domains instead of studying one domain in a block.`);
  plan.push(`Finish with an explain-it-yourself checkpoint on ${weak[0] || "a key Azure concept"}.`);
  $("study-plan").innerHTML=plan.map(x=>`<li>${x}</li>`).join("");

  $("domain-mastery").innerHTML=DOMAINS.map(d=>{
    const m=domainMastery(d.name);
    return `<div class="domain-row"><div class="domain-row-top"><strong>${d.name}</strong><span>${m}% · ${d.weight}</span></div><div class="meter"><div style="width:${m}%"></div></div></div>`;
  }).join("");

  const issues=weak.slice(0,5).filter(c=>conceptState(c).attempts || conceptState(c).highConfidenceMisses);
  $("misconception-list").innerHTML=issues.length ? issues.map(c=>{
    const cs=conceptState(c);
    const notes=state.confusions.filter(x=>x.concept===c).slice(-1)[0];
    return `<div class="misconception-item"><strong>${c}</strong><span class="muted">Mastery ${Math.round(cs.mastery)}%${cs.highConfidenceMisses?` · ${cs.highConfidenceMisses} high-confidence miss${cs.highConfidenceMisses===1?"":"es"}`:""}</span>${notes?`<p class="muted">Your note: ${escapeHtml(notes.note)}</p>`:""}</div>`;
  }).join("") : `<p class="muted">No misconceptions logged yet. The trainer will surface them as you answer questions.</p>`;
}
function startSession(mode="learn", weakOnly=false){
  updateStreak();
  const count=mode==="exam" ? Math.min(18,QUESTION_BANK.length) : 10;
  session={mode, queue: mode==="exam" ? shuffle([...QUESTION_BANK]).slice(0,count) : buildAdaptiveQueue(count,weakOnly), index:0, correct:0, confidence:[], improved:new Set(), reviewScheduled:0, records:[]};
  selectedAnswer=null; saveState(); renderQuestion(); showView("quiz-view");
}
function renderQuestion(){
  const q=session.queue[session.index];
  selectedAnswer=null;
  $("mode-label").textContent=session.mode==="exam"?"Exam mode":"Learn mode";
  $("session-title").textContent=session.mode==="exam"?"AZ-900 simulation":"Adaptive learning session";
  $("progress-text").textContent=`${session.index+1} / ${session.queue.length}`;
  $("session-score").textContent=`${session.correct} correct`;
  $("progress-bar").style.width=`${(session.index/session.queue.length)*100}%`;
  $("domain-tag").textContent=q.domain;
  $("concept-tag").textContent=q.concept;
  $("question-text").textContent=q.q;
  $("generation-prompt").textContent=session.mode==="exam"?"Feedback is hidden until the end.":"Commit to an answer first. Then rate your confidence before you see the explanation.";
  $("feedback-panel").classList.add("hidden");
  $("confidence-panel").classList.add("hidden");
  $("confusion-box").classList.add("hidden");
  $("transfer-box").classList.add("hidden");
  $("confusion-input").value="";
  $("save-confusion").textContent="Save misconception";
  $("save-confusion").disabled=false;
  $("answers").innerHTML=q.options.map((o,i)=>`<button class="answer-btn" data-index="${i}" type="button">${String.fromCharCode(65+i)}. ${o}</button>`).join("");
  document.querySelectorAll(".answer-btn").forEach(btn=>btn.addEventListener("click",()=>chooseAnswer(Number(btn.dataset.index))));
}
function chooseAnswer(index){
  if(selectedAnswer!==null) return;
  selectedAnswer=index;
  document.querySelectorAll(".answer-btn").forEach((b,i)=>b.classList.toggle("selected",i===index));
  if(session.mode==="exam"){ recordExamAnswer(index); return; }
  $("confidence-panel").classList.remove("hidden");
}
function recordExamAnswer(index){
  const q=session.queue[session.index], isCorrect=index===q.answer;
  session.records.push({q,selected:index,correct:isCorrect,confidence:null});
  if(isCorrect) session.correct++;
  setTimeout(nextQuestion,180);
}
function applyLearningResult(confidence){
  const q=session.queue[session.index], isCorrect=selectedAnswer===q.answer, cs=conceptState(q.concept);
  const oldMastery=cs.mastery||0;
  cs.attempts++; state.answered++; session.confidence.push(confidence);
  if(isCorrect){ cs.correct++; state.correct++; session.correct++; }
  if(!isCorrect && confidence===3){ cs.highConfidenceMisses++; state.highConfidenceMisses++; }
  let delta=isCorrect ? (confidence===3?16:confidence===2?13:10) : -(confidence===3?18:confidence===2?12:8);
  cs.mastery=Math.max(0,Math.min(100,(cs.mastery||0)+delta));
  if(cs.mastery>oldMastery) session.improved.add(q.concept);
  scheduleReview(cs,isCorrect,confidence);
  session.reviewScheduled++;
  session.records.push({q,selected:selectedAnswer,correct:isCorrect,confidence});
  saveState();
  showFeedback(q,isCorrect);
}
function scheduleReview(cs,isCorrect,confidence){
  if(!isCorrect) cs.interval=0;
  else if(cs.interval===0) cs.interval=1;
  else cs.interval=Math.min(30,Math.max(1,Math.round(cs.interval*(confidence===3?2.5:confidence===2?2:1.4))));
  const days=isCorrect?cs.interval:0;
  cs.nextReview=Date.now()+days*86400000;
}
function showFeedback(q,isCorrect){
  $("confidence-panel").classList.add("hidden");
  const p=$("feedback-panel");
  p.classList.remove("hidden","success","error"); p.classList.add(isCorrect?"success":"error");
  $("feedback-title").textContent=isCorrect?"Correct — now lock in the why.":"Not quite — fix the mental model.";
  $("feedback-text").textContent=q.explanation;
  document.querySelectorAll(".answer-btn").forEach((b,i)=>{
    b.disabled=true;
    if(i===q.answer) b.classList.add("correct");
    else if(i===selectedAnswer) b.classList.add("incorrect");
  });
  $("transfer-text").textContent=q.transfer;
  $("transfer-box").classList.remove("hidden");
  if(!isCorrect) $("confusion-box").classList.remove("hidden");
}
function saveConfusion(){
  const q=session.queue[session.index], note=$("confusion-input").value.trim();
  if(note){
    state.confusions.push({concept:q.concept,note,date:new Date().toISOString()});
    saveState();
    $("save-confusion").textContent="Saved";
    $("save-confusion").disabled=true;
  }
}
function nextQuestion(){
  session.index++;
  if(session.index>=session.queue.length){ maybeFeynman(); return; }
  renderQuestion();
}
function maybeFeynman(){
  if(session.mode==="exam"){ finishSession(); return; }
  const weakest=[...session.records].sort((a,b)=>masteryFor(a.q.concept)-masteryFor(b.q.concept))[0];
  const concept=weakest?.q.concept || session.queue[0].concept;
  $("feynman-prompt").textContent=`In your own words, explain ${concept}. What problem does it solve, and when would you use it?`;
  $("feynman-answer").value="";
  $("feynman-key").classList.add("hidden");
  $("finish-feynman").classList.add("hidden");
  $("show-feynman-key").classList.remove("hidden");
  $("feynman-key").dataset.concept=concept;
  showView("feynman-view");
}
function showFeynmanKey(){
  const concept=$("feynman-key").dataset.concept;
  const q=QUESTION_BANK.find(x=>x.concept===concept);
  $("feynman-key").innerHTML=`<p class="eyebrow">Key idea to compare against</p><p>${q.explanation}</p><p class="muted">Don't grade yourself on exact wording. Ask whether your explanation captured the purpose, the distinguishing feature, and when to use it.</p>`;
  $("feynman-key").classList.remove("hidden");
  $("finish-feynman").classList.remove("hidden");
  $("show-feynman-key").classList.add("hidden");
}
function finishSession(){
  if(session.mode==="exam"){
    session.records.forEach(r=>{
      const cs=conceptState(r.q.concept), old=cs.mastery||0;
      cs.attempts++; state.answered++;
      if(r.correct){ cs.correct++; state.correct++; cs.mastery=Math.min(100,old+10); }
      else { cs.mastery=Math.max(0,old-8); }
      scheduleReview(cs,r.correct,2); session.reviewScheduled++;
      if(cs.mastery>old) session.improved.add(r.q.concept);
    });
    saveState();
  }
  const total=session.queue.length, accuracy=Math.round(session.correct/total*100);
  $("results-heading").textContent=accuracy>=80?"Strong session.":accuracy>=65?"Good base — now target the misses.":"Perfect data for the adaptive engine.";
  $("results-summary").textContent=session.mode==="exam"
    ? `You scored ${session.correct}/${total}. The dashboard has scheduled weaker concepts for review.`
    : `You scored ${session.correct}/${total}. The next session will automatically give more weight to weak, due, and high-confidence-missed concepts.`;
  $("result-accuracy").textContent=accuracy+"%";
  $("result-confidence").textContent=session.confidence.length ? ({1:"Guessing",2:"Somewhat sure",3:"Very sure"}[Math.round(session.confidence.reduce((a,b)=>a+b,0)/session.confidence.length)]) : "Exam";
  $("result-improved").textContent=session.improved.size;
  $("result-review").textContent=session.reviewScheduled;
  $("progress-bar").style.width="100%";
  renderDashboard(); showView("results-view");
}
function resetProgress(){
  if(confirm("Reset all AZ-900 mastery, confidence, confusion, and spaced-repetition history on this browser?")){
    state=defaultState(); saveState(); renderDashboard(); showView("dashboard-view");
  }
}
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
function escapeHtml(s){ return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m])); }

$("start-learn").addEventListener("click",()=>startSession("learn"));
$("start-exam").addEventListener("click",()=>startSession("exam"));
$("retry-weak").addEventListener("click",()=>startSession("learn",true));
$("return-dashboard").addEventListener("click",()=>{renderDashboard();showView("dashboard-view");});
$("reset-progress").addEventListener("click",resetProgress);
$("save-confusion").addEventListener("click",saveConfusion);
$("next-question").addEventListener("click",nextQuestion);
$("show-feynman-key").addEventListener("click",showFeynmanKey);
$("finish-feynman").addEventListener("click",finishSession);
document.querySelectorAll(".confidence-btn").forEach(btn=>btn.addEventListener("click",()=>applyLearningResult(Number(btn.dataset.confidence))));

renderDashboard();
