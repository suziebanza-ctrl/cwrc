"use client";

import {useEffect, useState} from "react";

type Row = Record<string, any>;
const blankEntry = {title_fr:"",title_en:"",title_es:"",description_fr:"",description_en:"",description_es:"",poster_url:"",poster_alt_fr:"",poster_alt_en:"",poster_alt_es:"",music_url:"",film_url:"",display_order:1,is_published:false};
const blankStory = {chapter_number:1,title_fr:"",title_en:"",title_es:"",story_fr:"",story_en:"",story_es:"",illustration_url:"",factual_notes:"",resource_url:"",is_published:false};

export default function TheatreStoryManager() {
  const [entries,setEntries]=useState<Row[]>([]), [stories,setStories]=useState<Row[]>([]);
  const [entry,setEntry]=useState<Row>(blankEntry), [story,setStory]=useState<Row>(blankStory), [message,setMessage]=useState("");
  const base=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const headers=()=>({apikey:key||"",Authorization:`Bearer ${sessionStorage.getItem("cwrc_admin_token")||key||""}`,"Content-Type":"application/json",Prefer:"return=representation"});
  const load=async()=>{if(!base||!key)return; const [a,b]=await Promise.all([fetch(`${base}/rest/v1/theatre_entries?select=*&order=display_order.asc`,{headers:headers()}),fetch(`${base}/rest/v1/imaginary_stories?select=*&order=chapter_number.asc`,{headers:headers()})]);if(a.ok)setEntries(await a.json());if(b.ok)setStories(await b.json())};
  useEffect(()=>{load()},[]);
  const save=async(table:string,row:Row,setter:(r:Row)=>void)=>{if(!base)return;const id=row.id;const body={...row};delete body.id;const r=await fetch(`${base}/rest/v1/${table}${id?`?id=eq.${id}`:""}`,{method:id?"PATCH":"POST",headers:headers(),body:JSON.stringify(body)});setMessage(r.ok?"Enregistré avec succès.":"Impossible d’enregistrer.");if(r.ok){const saved=(await r.json())[0];setter(saved);load()}};
  const field=(label:string,name:string,row:Row,setter:(v:Row)=>void,area=false)=><label>{label}{area?<textarea value={row[name]||""} onChange={e=>setter({...row,[name]:e.target.value})}/>:<input value={row[name]??""} onChange={e=>setter({...row,[name]:e.target.value})}/>}</label>;
  return <section className="manager"><h2>🎭 Théâtre et recueil d’histoires</h2><p>Créez les affiches du théâtre et les rencontres imaginaires dans les trois langues.</p>{message&&<strong>{message}</strong>}
    <div className="columns"><form onSubmit={e=>{e.preventDefault();save("theatre_entries",entry,setEntry)}}><h3>Programmation du théâtre</h3><select onChange={e=>setEntry(entries.find(x=>x.id===e.target.value)||blankEntry)}><option value="">Nouvelle affiche</option>{entries.map(x=><option key={x.id} value={x.id}>{x.title_fr}</option>)}</select>
      {field("Titre français","title_fr",entry,setEntry)}{field("Titre anglais","title_en",entry,setEntry)}{field("Titre espagnol","title_es",entry,setEntry)}
      {field("Résumé français","description_fr",entry,setEntry,true)}{field("Résumé anglais","description_en",entry,setEntry,true)}{field("Résumé espagnol","description_es",entry,setEntry,true)}
      {field("URL de l’affiche","poster_url",entry,setEntry)}{field("Lien musique","music_url",entry,setEntry)}{field("Lien film","film_url",entry,setEntry)}
      <label><input type="checkbox" checked={!!entry.is_published} onChange={e=>setEntry({...entry,is_published:e.target.checked})}/> Publier</label><button>Enregistrer l’affiche</button>
    </form><form onSubmit={e=>{e.preventDefault();save("imaginary_stories",story,setStory)}}><h3>Rencontre imaginaire</h3><select onChange={e=>setStory(stories.find(x=>x.id===e.target.value)||blankStory)}><option value="">Nouvelle histoire</option>{stories.map(x=><option key={x.id} value={x.id}>{x.title_fr}</option>)}</select>
      {field("Numéro de chapitre","chapter_number",story,setStory)}{field("Titre français","title_fr",story,setStory)}{field("Titre anglais","title_en",story,setStory)}{field("Titre espagnol","title_es",story,setStory)}
      {field("Histoire française","story_fr",story,setStory,true)}{field("Histoire anglaise","story_en",story,setStory,true)}{field("Histoire espagnole","story_es",story,setStory,true)}
      {field("URL de l’illustration","illustration_url",story,setStory)}{field("Repères historiques","factual_notes",story,setStory,true)}{field("Lien documentaire","resource_url",story,setStory)}
      <label><input type="checkbox" checked={!!story.is_published} onChange={e=>setStory({...story,is_published:e.target.checked})}/> Publier</label><button>Enregistrer l’histoire</button>
    </form></div><style jsx>{`.manager{margin-top:42px;padding:28px;background:#f5ead0;border:2px solid #b48946;border-radius:20px;color:#382719}.columns{display:grid;grid-template-columns:1fr 1fr;gap:24px}form{display:grid;gap:12px;padding:20px;background:#fffaf0;border-radius:14px}label{display:grid;gap:5px;font-weight:700}input,textarea,select{padding:10px;border:1px solid #9a7848;border-radius:8px;font:inherit}textarea{min-height:90px}button{padding:12px;background:#173a62;color:white;border:0;border-radius:999px;font-weight:700}@media(max-width:800px){.columns{grid-template-columns:1fr}}`}</style>
  </section>;
}
