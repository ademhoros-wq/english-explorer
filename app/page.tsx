"use client";
import {useMemo,useState} from "react";
type Q={skill:string;q:string;opts?:string[];answer:string;input?:boolean};
const questions:Q[]=[
{skill:"Listening",q:"What color is the ball? 🔴",opts:["Blue","Red","Green"],answer:"Red"},
{skill:"Listening",q:"How many apples are there? 🍎🍎🍎",opts:["Two","Three","Five"],answer:"Three"},
{skill:"Listening",q:"Touch your book. What is it? 📘",opts:["A book","A pen","A bag"],answer:"A book"},
{skill:"Listening",q:"Where is the cat? 🐱",opts:["Under the table","On the bed","In the bag"],answer:"Under the table"},
{skill:"Listening",q:"How old is Ben? 👦",opts:["Six","Seven","Eight"],answer:"Seven"},
{skill:"Listening",q:"Which animal says meow? 🐱",opts:["Dog","Cat","Bird"],answer:"Cat"},
{skill:"Listening",q:"What color is the bag? 🎒",opts:["Blue","Yellow","Pink"],answer:"Blue"},
{skill:"Listening",q:"Tom is in the garden. What color is his ball? ⚽",opts:["Yellow","Red","Green"],answer:"Yellow"},
{skill:"Reading",q:"The dog is big. Is it true? 🐶",opts:["True","False"],answer:"True"},
{skill:"Reading",q:"The cat is under the chair. Where is the cat?",opts:["Under the chair","On the chair","In the box"],answer:"Under the chair"},
{skill:"Reading",q:"Emma has two pencils. How many pencils?",opts:["One","Two","Three"],answer:"Two"},
{skill:"Reading",q:"The sun is yellow. What color is the sun?",opts:["Blue","Yellow","Black"],answer:"Yellow"},
{skill:"Reading",q:"Ben likes apples. What does Ben like?",opts:["Apples","Cars","Dogs"],answer:"Apples"},
{skill:"Reading",q:"Tom is with his mother. Who is with Tom?",opts:["His mother","His teacher","His friend"],answer:"His mother"},
{skill:"Reading",q:"Tom wants a football. What does he want?",opts:["A football","A bike","A book"],answer:"A football"},
{skill:"Reading",q:"Lucy has a brown dog. What color is the dog?",opts:["Brown","White","Black"],answer:"Brown"},
{skill:"Writing",q:"Write the word for this animal: 🐱",answer:"cat",input:true},
{skill:"Writing",q:"Write the word for this fruit: 🍎",answer:"apple",input:true},
{skill:"Writing",q:"Unscramble: G - O - D",answer:"dog",input:true},
{skill:"Writing",q:"Complete: My name is ______.",answer:"personal",input:true},
{skill:"Writing",q:"Complete: I am ______ years old.",answer:"personal",input:true},
{skill:"Writing",q:"Complete: The dog is ______. (brown)",answer:"brown",input:true},
{skill:"Language Use",q:"Choose: I ___ seven.",opts:["am","is","are"],answer:"am"},
{skill:"Language Use",q:"Choose: She ___ happy.",opts:["am","is","are"],answer:"is"},
{skill:"Language Use",q:"Choose: They ___ my friends.",opts:["am","is","are"],answer:"are"},
{skill:"Language Use",q:"Choose: This is ___ apple.",opts:["a","an","the"],answer:"an"}];
const correct=(q:Q,a:string)=>q.answer==="personal"?a.trim().length>0:a.trim().toLowerCase()===q.answer.toLowerCase();
const bands=[["Strong Pre-A1 Foundation",24,26],["Developing Pre-A1",20,23],["Early Pre-A1",15,19],["Beginning English",0,14]];
export default function Home(){
const [i,setI]=useState(0),[answers,setAnswers]=useState<string[]>([]),[done,setDone]=useState(false),[name,setName]=useState("");
const q=questions[i];const score=useMemo(()=>answers.reduce((s,a,n)=>s+(a&&correct(questions[n],a)?1:0),0),[answers]);
const choose=(a:string)=>{const x=[...answers];x[i]=a;setAnswers(x)};
const next=()=>i<questions.length-1?setI(i+1):setDone(true);
if(done){const band=bands.find(b=>score>=b[1]&&score<=b[2])![0];return <main className="wrap"><div className="card result"><div className="fox">🦊</div><h1>Great job{name?", "+name:""}!</h1><p className="score">{score} / 26</p><h2>{band}</h2><p>This is a playful Pre-A1 progress assessment, not an official CEFR certificate.</p><div className="grid">{["Listening","Reading","Writing","Language Use"].map(s=><div className="mini" key={s}><b>{s}</b><span>{answers.reduce((n,a,k)=>n+(questions[k].skill===s&&a&&correct(questions[k],a)?1:0),0)} / {questions.filter(x=>x.skill===s).length}</span></div>)}</div><div className="certificate"><div className="fox">🦊</div><h2>English Explorer</h2><h3>Pre-A1 Progress Certificate</h3><p>This certifies completion of the English Explorer assessment.</p>{name&&<strong>{name}</strong>}</div><button onClick={()=>window.print()}>Print / Save PDF</button><button className="secondary" onClick={()=>{setAnswers([]);setI(0);setDone(false)}}>Try again</button></div></main>}
return <main className="wrap"><header><div className="brand">🦊 <span>English Explorer</span></div><div className="pill">{i+1} / {questions.length}</div></header><div className="card"><div className="fox">🦊</div><p className="skill">{q.skill}</p><h1>{q.q}</h1>{i===0&&<div className="namebox"><label>Child's first name (optional)</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="First name"/></div>}{q.input?<input className="answer" value={answers[i]||""} onChange={e=>choose(e.target.value)} placeholder="Type your answer here..."/>:<div className="options">{q.opts!.map(o=><button key={o} className={answers[i]===o?"selected":""} onClick={()=>choose(o)}>{o}</button>)}</div>}<button className="next" disabled={!answers[i]?.trim()} onClick={next}>{i===questions.length-1?"Finish assessment":"Next →"}</button></div><div className="bar"><span style={{width:(i/questions.length*100)+"%"}}/></div></main>}