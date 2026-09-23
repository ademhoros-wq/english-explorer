"use client";
import {useEffect,useMemo,useState} from "react";

type Q={section:"Listening"|"Reading & Writing";type:"choice"|"input"|"tf";prompt:string;opts?:string[];answer?:string;visual:string;audio?:string};

const questions:Q[]=[
{section:"Listening",type:"choice",prompt:"What colour is the apple?",opts:["Red","Blue","Green"],answer:"Red",visual:"ball",audio:"What colour is the apple? The apple is red."},
{section:"Listening",type:"choice",prompt:"How many apples are there?",opts:["Two","Three","Four"],answer:"Three",visual:"apples",audio:"How many apples are there? There are three apples."},
{section:"Listening",type:"choice",prompt:"What is this?",opts:["A book","A pencil","A bag"],answer:"A book",visual:"book",audio:"Look at the picture. What is this? It is a book."},
{section:"Listening",type:"choice",prompt:"Where is the cat?",opts:["Under the table","On the bed","In the bag"],answer:"Under the table",visual:"cat",audio:"Where is the cat? The cat is under the table."},
{section:"Listening",type:"choice",prompt:"How old is Ben?",opts:["Six","Seven","Eight"],answer:"Seven",visual:"child",audio:"How old is Ben? Ben is seven."},
{section:"Listening",type:"choice",prompt:"Which animal says 'meow'?",opts:["A dog","A cat","A bird"],answer:"A cat",visual:"cat",audio:"Which animal says meow? A cat says meow."},
{section:"Listening",type:"choice",prompt:"What colour is the bag?",opts:["Blue","Yellow","Pink"],answer:"Blue",visual:"bag",audio:"What colour is the bag? The bag is blue."},
{section:"Listening",type:"choice",prompt:"What colour is Tom's ball?",opts:["Yellow","Red","Green"],answer:"Yellow",visual:"garden",audio:"Tom is in the garden. His ball is yellow. What colour is Tom's ball?"},
{section:"Listening",type:"choice",prompt:"Which girl is wearing the hat?",opts:["Girl A","Girl B","Girl C"],answer:"Girl A",visual:"girls",audio:"Look carefully. Which girl is wearing the hat?"},
{section:"Listening",type:"choice",prompt:"What is on the table?",opts:["A cup","A book","A ball"],answer:"A cup",visual:"table",audio:"Look at the table. What is on the table? A cup."},
{section:"Listening",type:"choice",prompt:"Where is the teddy?",opts:["In the box","On the chair","Under the bed"],answer:"On the chair",visual:"teddy",audio:"Where is the teddy? The teddy is on the chair."},
{section:"Listening",type:"choice",prompt:"What number do you hear?",opts:["14","40","4"],answer:"14",visual:"number",audio:"Fourteen."},
{section:"Listening",type:"choice",prompt:"What colour is the star?",opts:["Purple","Orange","Green"],answer:"Orange",visual:"star",audio:"What colour is the star? The star is orange."},
{section:"Listening",type:"choice",prompt:"Who is wearing red?",opts:["Mia","Leo","Sam"],answer:"Leo",visual:"family",audio:"Mia is wearing blue. Leo is wearing red. Sam is wearing green. Who is wearing red?"},
{section:"Listening",type:"choice",prompt:"What does Anna want?",opts:["A bike","A kite","A doll"],answer:"A kite",visual:"park",audio:"Anna is in the park. She wants a kite. What does Anna want?"},
{section:"Listening",type:"choice",prompt:"Which picture shows the boy sleeping?",opts:["Picture A","Picture B","Picture C"],answer:"Picture B",visual:"differences",audio:"Look at the three pictures. Which picture shows the boy sleeping?"},
{section:"Listening",type:"choice",prompt:"Where is the pencil?",opts:["Next to the book","Behind the bag","In the box"],answer:"Next to the book",visual:"desk",audio:"Where is the pencil? It is next to the book."},
{section:"Listening",type:"choice",prompt:"How many balloons?",opts:["Five","Six","Seven"],answer:"Six",visual:"balloons",audio:"Look at the balloons. How many are there? Six."},
{section:"Listening",type:"choice",prompt:"Where is the boy?",opts:["At home","At the park","At school"],answer:"At the park",visual:"kite",audio:"The boy is at the park. Where is the boy?"},
{section:"Listening",type:"choice",prompt:"What is the last colour you hear?",opts:["Yellow","Blue","Red"],answer:"Red",visual:"colours",audio:"Yellow, blue and red. What is the last colour you hear?"},

{section:"Reading & Writing",type:"tf",prompt:"The dog is big. Is this true?",opts:["Yes","No"],answer:"Yes",visual:"dog"},
{section:"Reading & Writing",type:"tf",prompt:"Look at the picture. Is the cat under the chair?",opts:["Yes","No"],answer:"Yes",visual:"cat"},
{section:"Reading & Writing",type:"choice",prompt:"Emma has two pencils. How many pencils does Emma have?",opts:["One","Two","Three"],answer:"Two",visual:"pencils"},
{section:"Reading & Writing",type:"choice",prompt:"The sun is yellow. What colour is the sun?",opts:["Blue","Yellow","Black"],answer:"Yellow",visual:"sun"},
{section:"Reading & Writing",type:"choice",prompt:"Ben likes apples. What does Ben like?",opts:["Apples","Cars","Dogs"],answer:"Apples",visual:"apples"},
{section:"Reading & Writing",type:"choice",prompt:"Tom is with his mother. Who is with Tom?",opts:["His mother","His teacher","His friend"],answer:"His mother",visual:"family"},
{section:"Reading & Writing",type:"choice",prompt:"Tom wants a football. What does he want?",opts:["A football","A bike","A book"],answer:"A football",visual:"ball"},
{section:"Reading & Writing",type:"choice",prompt:"Lucy has a brown dog. What colour is the dog?",opts:["Brown","White","Black"],answer:"Brown",visual:"dog"},
{section:"Reading & Writing",type:"input",prompt:"Write the word for the picture.",answer:"cat",visual:"cat"},
{section:"Reading & Writing",type:"input",prompt:"Write the word for the picture.",answer:"apple",visual:"apples"},
{section:"Reading & Writing",type:"input",prompt:"Put the letters in the right order: G • O • D",answer:"dog",visual:"dog"},
{section:"Reading & Writing",type:"input",prompt:"Complete: My name is ______.",answer:"personal",visual:"child"},
{section:"Reading & Writing",type:"input",prompt:"Complete: I am ______ years old.",answer:"personal",visual:"child"},
{section:"Reading & Writing",type:"choice",prompt:"What colour is the dog?",opts:["Brown","Blue","Green"],answer:"Brown",visual:"dog"},
{section:"Reading & Writing",type:"choice",prompt:"Choose the missing word: I ___ seven.",opts:["am","is","are"],answer:"am",visual:"child"},
{section:"Reading & Writing",type:"choice",prompt:"Choose the missing word: She ___ happy.",opts:["am","is","are"],answer:"is",visual:"girl"},
{section:"Reading & Writing",type:"choice",prompt:"Choose the missing word: They ___ my friends.",opts:["am","is","are"],answer:"are",visual:"friends"},
{section:"Reading & Writing",type:"choice",prompt:"Choose the missing word: This is ___ apple.",opts:["a","an","the"],answer:"an",visual:"apples"},
{section:"Reading & Writing",type:"choice",prompt:"Read: 'Sam has a red bike.' What colour is Sam's bike?",opts:["Red","Blue","Green"],answer:"Red",visual:"bike"},
{section:"Reading & Writing",type:"choice",prompt:"What animal is this?",opts:["A penguin","A bear","A tiger"],answer:"A penguin",visual:"bird"},
{section:"Reading & Writing",type:"choice",prompt:"Read: 'Mia has a small white cat.' What does Mia have?",opts:["A dog","A cat","A rabbit"],answer:"A cat",visual:"cat"},
{section:"Reading & Writing",type:"choice",prompt:"Which shape is a triangle?",opts:["Circle","Square","Triangle"],answer:"Triangle",visual:"star"},
{section:"Reading & Writing",type:"choice",prompt:"Which word completes the sentence? This is a ___.",opts:["book","books","booking"],answer:"book",visual:"book"},
{section:"Reading & Writing",type:"choice",prompt:"Which word completes the sentence? I like ___.",opts:["apples","apple","appling"],answer:"apples",visual:"apples"},
{section:"Reading & Writing",type:"choice",prompt:"Choose the correct sentence.",opts:["He are happy.","He is happy.","He am happy."],answer:"He is happy.",visual:"child"},
{section:"Reading & Writing",type:"choice",prompt:"Choose the correct sentence.",opts:["They is friends.","They am friends.","They are friends."],answer:"They are friends.",visual:"friends"},
{section:"Reading & Writing",type:"choice",prompt:"Read the mini-story: 'Leo has a blue bag. He puts a book in it.' What is in the bag?",opts:["A book","A ball","A pencil"],answer:"A book",visual:"bag"},
{section:"Reading & Writing",type:"choice",prompt:"Read the mini-story: 'Lily is in the garden. She sees a yellow flower.' What does Lily see?",opts:["A yellow flower","A red ball","A blue bird"],answer:"A yellow flower",visual:"garden"},
{section:"Reading & Writing",type:"choice",prompt:"Read: 'It is sunny. The children are in the park.' Where are the children?",opts:["At school","In the park","At home"],answer:"In the park",visual:"park"},
{section:"Reading & Writing",type:"choice",prompt:"What animal is this?",opts:["A rabbit","A cat","A dog"],answer:"A rabbit",visual:"rabbit"},
{section:"Reading & Writing",type:"choice",prompt:"Which word is a colour?",opts:["Happy","Purple","Jump"],answer:"Purple",visual:"colours"},
{section:"Reading & Writing",type:"choice",prompt:"Which word is an animal?",opts:["Apple","Tiger","Table"],answer:"Tiger",visual:"animal"},
{section:"Reading & Writing",type:"choice",prompt:"Which word is a number?",opts:["Seven","Yellow","Mother"],answer:"Seven",visual:"number"},
{section:"Reading & Writing",type:"choice",prompt:"Which word is a family member?",opts:["Brother","Ball","Blue"],answer:"Brother",visual:"family"},
{section:"Reading & Writing",type:"choice",prompt:"Which word is an object?",opts:["Pencil","Happy","Run"],answer:"Pencil",visual:"pencils"}];

const bands:[string,number,number][]=[
["Strong Pre-A1 Foundation",48,53],["Developing Pre-A1",40,47],["Early Pre-A1",30,39],["Beginning English",0,29]
];

function Illustration({kind}:{kind:string}){const scenes:Record<string,{main:string;items:string[];tone:string}>={
ball:{main:"🍎",items:["✨","🍃","🧺"],tone:"warm"},
apples:{main:"🍎",items:["🍎","🍎","🍃"],tone:"garden"},
book:{main:"📘",items:["✏️","📚","⭐"],tone:"classroom"},
cat:{main:"🐱",items:["🪑","🌿","🧶"],tone:"home"},
dog:{main:"🐶",items:["🏠","🥣","⚽"],tone:"garden"},
bag:{main:"🎒",items:["📚","✏️","⭐"],tone:"classroom"},
child:{main:"👦",items:["🌳","⚽","⭐"],tone:"park"},
girl:{main:"👧",items:["🌸","🎀","⭐"],tone:"park"},
friends:{main:"🧒",items:["👧","👦","🌈"],tone:"park"},
family:{main:"👨‍👩‍👦",items:["🏠","❤️","🌿"],tone:"home"},
sun:{main:"☀️",items:["☁️","🌼","🦋"],tone:"sky"},
star:{main:"⭐",items:["✨","🌙","☁️"],tone:"night"},
garden:{main:"🌳",items:["🌼","🦋","⚽"],tone:"garden"},
park:{main:"🛝",items:["🌳","🪁","🌼"],tone:"park"},
table:{main:"🥤",items:["🍎","🥪","📘"],tone:"home"},
teddy:{main:"🧸",items:["🛏️","💡","⭐"],tone:"home"},
number:{main:"🔢",items:["🍎","✏️","📚"],tone:"classroom"},
girls:{main:"👧",items:["👧🎩","👧","👧"],tone:"park"},
differences:{main:"🖼️",items:["👦📖","😴","🍎"],tone:"classroom"},
desk:{main:"📚",items:["✏️","🖊️","📓"],tone:"classroom"},
balloons:{main:"🎈",items:["🎈","🎈","🎈"],tone:"sky"},
kite:{main:"🪁",items:["☁️","🌳","🌼"],tone:"sky"},
colours:{main:"🎨",items:["🔴","🔵","🟡"],tone:"classroom"},
pencils:{main:"✏️",items:["🟡","🟢","🔵"],tone:"classroom"},
bike:{main:"🚲",items:["🌳","🌼","☀️"],tone:"park"},
bird:{main:"🐦",items:["🌳","☁️","🌼"],tone:"garden"},
rabbit:{main:"🐰",items:["🥕","🌿","🌼"],tone:"garden"},
animal:{main:"🐯",items:["🌿","🌳","⭐"],tone:"garden"}
};const s=scenes[kind]||scenes.child;return <div className={`rich-art tone-${s.tone}`} aria-hidden="true"><div className="rich-decor rich-left">{s.items[0]}</div><div className="rich-decor rich-right">{s.items[1]}</div><div className="rich-main">{s.main}</div><div className="rich-decor rich-bottom">{s.items[2]}</div><div className="rich-glow"/></div>}
function Logo(){return <div className="logo"><div className="logo-mark">E</div><div><strong>English Explorer</strong><small>Young Learner Assessment</small></div></div>}

export default function Home(){
 const [i,setI]=useState(0),[answers,setAnswers]=useState<string[]>([]),[done,setDone]=useState(false),[name,setName]=useState(""),[started,setStarted]=useState(false);
 const q=questions[i];
 const objectiveCount=questions.filter(x=>x.answer!=="personal").length;
 useEffect(()=>{if(started&&q.section==="Listening"&&q.audio&&typeof window!=="undefined"){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(q.audio);u.lang="en-US";u.rate=.82;u.pitch=1;window.speechSynthesis.speak(u)}return()=>{if(typeof window!=="undefined")window.speechSynthesis.cancel()}},[i,q.audio,q.section,started]);
 const play=()=>{if(typeof window==="undefined"||!q.audio)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(q.audio);u.lang="en-US";u.rate=.82;window.speechSynthesis.speak(u)};
 const score=useMemo(()=>answers.reduce((s,a,n)=>s+(a&&questions[n].answer&&questions[n].answer!=="personal"&&a.trim().toLowerCase()===questions[n].answer!.toLowerCase()?1:0),0),[answers]);
 const choose=(a:string)=>{const x=[...answers];x[i]=a;setAnswers(x)};
 const next=()=>i<questions.length-1?setI(i+1):setDone(true);
 const sectionStart=i===0||questions[i-1]?.section!==q.section;
 if(!started)return <main className="shell"><nav><Logo/><span className="trust">Designed for young learners</span></nav><section className="hero"><div className="hero-copy"><div className="eyebrow">PRE-A1 · AGE 7–8</div><h1>English skills,<br/><em>made an adventure.</em></h1><p>A friendly online assessment that checks listening, reading and writing through short, familiar tasks.</p><div className="hero-actions"><button className="primary" onClick={()=>setStarted(true)}>Start assessment <span>→</span></button><span className="meta">About 25–30 minutes · 55 questions</span></div></div><div className="hero-art"><div className="orbit o1"/><div className="orbit o2"/><div className="explorer-card"><div className="fox-face">E</div><div className="spark s1">✦</div><div className="spark s2">✦</div><div className="mini-card"><b>LISTEN</b><span>🔊</span></div><div className="mini-card m2"><b>READ</b><span>ABC</span></div><div className="mini-card m3"><b>WRITE</b><span>✎</span></div></div></div></section><section className="feature-row"><div><b>01</b><span>Listening</span><small>Short audio + picture choices</small></div><div><b>02</b><span>Reading & Writing</span><small>Pictures, words & mini-stories</small></div><div><b>03</b><span>Progress report</span><small>Clear results for families</small></div></section><footer>English Explorer · Pre-A1 Progress Assessment · Not an official Cambridge or CEFR certificate</footer></main>;
 if(done){const band=bands.find(b=>score>=b[1]&&score<=b[2])?.[0]||"Beginning English";return <main className="shell"><nav><Logo/></nav><section className="result-page"><div className="result-top"><div className="result-badge">ASSESSMENT COMPLETE</div><h1>Well done{name?", "+name:""}!</h1><p>Your English Explorer journey is complete.</p></div><div className="result-grid"><div className="score-card"><span>Objective score</span><strong>{score}<i> / {objectiveCount}</i></strong><b>{band}</b><div className="score-line"><span style={{width:(score/objectiveCount*100)+"%"}}/></div></div><div className="profile-card"><h3>Skills checked</h3><div><span>Listening</span><b>{answers.filter((a,k)=>questions[k].section==="Listening"&&a&&questions[k].answer===a).length} / 20</b></div><div><span>Reading & Writing</span><b>{answers.filter((a,k)=>questions[k].section==="Reading & Writing"&&a&&questions[k].answer&&questions[k].answer!=="personal"&&a.toLowerCase()===questions[k].answer!.toLowerCase()).length} / 33</b></div><p>Use this report as a learning snapshot. It is not an official CEFR qualification.</p></div></div><div className="certificate"><div className="cert-mark">E</div><small>ENGLISH EXPLORER</small><h2>Pre-A1 Progress Certificate</h2><p>This certifies that</p><strong>{name||"the learner"}</strong><p>completed the English Explorer assessment.</p><div className="cert-foot"><span>Young Learner · Pre-A1</span><span>Progress Certificate</span></div></div><div className="result-actions"><button className="primary" onClick={()=>window.print()}>Print / Save PDF</button><button className="ghost" onClick={()=>{setAnswers([]);setI(0);setDone(false);setStarted(true)}}>Try again</button></div></section></main>}
 return <main className="shell"><nav><Logo/><div className="progress-wrap"><span>{i+1} / {questions.length}</span><div><i style={{width:((i+1)/questions.length*100)+"%"}}/></div></div></nav>{sectionStart&&<div className="section-intro"><span>{q.section==="Listening"?"01":"02"}</span><div><b>{q.section}</b><small>{q.section==="Listening"?"Listen carefully. You can play the audio again.":"Read the text and look at the picture before you answer."}</small></div></div>}<section className="test-card"><div className="task-label">{q.type==="tf"?"PICTURE + SENTENCE":q.type==="input"?"WORD WORK":q.section==="Listening"?"LISTEN & CHOOSE":"READ & CHOOSE"}</div><div className="visual-panel"><Illustration kind={q.visual}/></div><div className="question-copy"><h1>{q.prompt}</h1>{q.section==="Listening"&&<button className="audio-btn" onClick={play}>▶ <span>Play audio again</span></button>}</div>{i===0&&<div className="namebox"><label>Learner first name <span>(optional)</span></label><input value={name} onChange={e=>setName(e.target.value)} placeholder="First name"/></div>}{q.type==="input"?<input className="answer-input" value={answers[i]||""} onChange={e=>choose(e.target.value)} placeholder="Type your answer" autoComplete="off"/>:<div className="options">{q.opts!.map((o,n)=><button key={o} className={answers[i]===o?"selected":""} onClick={()=>choose(o)}><span className="option-letter">{String.fromCharCode(65+n)}</span>{o}</button>)}</div>}<button className="next-btn" disabled={!answers[i]?.trim()} onClick={next}>{i===questions.length-1?"Finish assessment":"Continue"}<span>→</span></button></section><div className="test-note">Take your time. There are no trick questions.</div></main>
}