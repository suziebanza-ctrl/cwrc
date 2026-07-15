"use client";

import {FormEvent, useState} from "react";
import type {Locale} from "../i18n/config";
import type {FormContent} from "../i18n/content";

type FormKind="ask"|"case";

const uiText:Record<Locale,{
  required:string; sending:string; successAsk:string; successCase:string;
  error:string; configuration:string; privacy:string;
}>={
  fr:{required:"Ce champ est requis.",sending:"Envoi au CWRC…",successAsk:"Question reçue! Elle attend maintenant sagement son examen par Cathy et Suzie. ☕",successCase:"Cas reçu! Le dossier vient d’entrer officiellement dans les mystérieuses archives du CWRC. 📚",error:"Le hibou administratif a égaré le formulaire. Veuillez réessayer dans un instant.",configuration:"La connexion sécurisée à Supabase n’est pas encore configurée.",privacy:"Votre nom et votre courriel sont facultatifs. Ils ne seront jamais publiés sans votre autorisation."},
  en:{required:"This field is required.",sending:"Sending to the CWRC…",successAsk:"Question received! It is now patiently awaiting review by Cathy and Suzie. ☕",successCase:"Case received! The file has officially entered the mysterious CWRC archives. 📚",error:"The administrative owl misplaced the form. Please try again in a moment.",configuration:"The secure Supabase connection is not configured yet.",privacy:"Your name and email are optional. They will never be published without your permission."},
  es:{required:"Este campo es obligatorio.",sending:"Enviando al CWRC…",successAsk:"¡Pregunta recibida! Ahora espera pacientemente la revisión de Cathy y Suzie. ☕",successCase:"¡Caso recibido! El expediente ha entrado oficialmente en los misteriosos archivos del CWRC. 📚",error:"El búho administrativo extravió el formulario. Inténtalo de nuevo en un momento.",configuration:"La conexión segura con Supabase aún no está configurada.",privacy:"Tu nombre y correo son opcionales. Nunca se publicarán sin tu permiso."},
};

const fieldNames:Record<FormKind,string[]>={
  ask:["visitor_name","visitor_email","category","question"],
  case:["visitor_name","visitor_email","category","statement","context_and_evidence","desired_verdict"],
};

export default function SubmissionForm({locale,kind,content}:{locale:Locale;kind:FormKind;content:FormContent}){
  const [state,setState]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [message,setMessage]=useState("");
  const t=uiText[locale];

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(state==="sending") return;
    const form=event.currentTarget;
    const data=new FormData(form);

    if(String(data.get("company")??"").trim()){
      setState("success");
      setMessage(kind==="ask"?t.successAsk:t.successCase);
      form.reset();
      return;
    }

    const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if(!url||!key){setState("error");setMessage(t.configuration);return;}

    const payload:Record<string,string|null>={locale};
    for(const name of fieldNames[kind]){
      const value=String(data.get(name)??"").trim();
      payload[name]=value||null;
    }

    setState("sending");
    setMessage("");
    try{
      const table=kind==="ask"?"ask_cathy_questions":"submitted_cases";
      const response=await fetch(`${url}/rest/v1/${table}`,{
        method:"POST",
        headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"return=minimal"},
        body:JSON.stringify(payload),
      });
      if(!response.ok) throw new Error(`Supabase returned ${response.status}`);
      form.reset();
      setState("success");
      setMessage(kind==="ask"?t.successAsk:t.successCase);
    }catch(error){
      console.error("CWRC submission failed",error);
      setState("error");
      setMessage(t.error);
    }
  }

  return <form style={formStyle} onSubmit={submit}>
    <label style={honeypotStyle} aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off"/></label>
    {content.fields.map((field,index)=>{
      const name=fieldNames[kind][index];
      const required=index>=2;
      return <label key={`${field.label}-${index}`} style={labelStyle}>{field.label}
        {field.kind==="select"?<select name={name} style={inputStyle} defaultValue="" required={required}><option value="" disabled>—</option>{field.options?.map(option=><option key={option} value={option}>{option}</option>)}</select>:field.kind==="textarea"?<textarea name={name} rows={8} placeholder={field.placeholder} style={textareaStyle} required={required} minLength={required?5:undefined}/>:<input name={name} type={field.kind??"text"} placeholder={field.placeholder} style={inputStyle} required={required}/>} 
      </label>;
    })}
    <p style={privacyStyle}>🔒 {t.privacy}</p>
    <button type="submit" style={{...submitStyle,opacity:state==="sending"?.65:1}} disabled={state==="sending"}>{state==="sending"?t.sending:content.button}</button>
    {message&&<div role="status" style={state==="success"?successStyle:errorStyle}>{message}</div>}
  </form>;
}

const formStyle={marginTop:"32px",display:"grid",gap:"22px"};
const labelStyle={display:"grid",gap:"8px",fontWeight:"bold"};
const inputStyle={padding:"14px 16px",borderRadius:"12px",border:"1px solid rgba(16,42,76,.25)",fontSize:"1rem",fontFamily:"Georgia,serif",backgroundColor:"white",color:"#102A4C"};
const textareaStyle={...inputStyle,resize:"vertical" as const};
const submitStyle={justifySelf:"start",padding:"14px 26px",borderRadius:"999px",backgroundColor:"#102A4C",color:"#F7F1E6",border:"none",fontWeight:"bold",cursor:"pointer",fontSize:"1rem"};
const privacyStyle={margin:0,padding:"14px 16px",borderRadius:"12px",backgroundColor:"#F7F1E6",color:"#6E5B3F",fontSize:".95rem",lineHeight:1.6};
const successStyle={padding:"18px",borderRadius:"14px",backgroundColor:"#E4F4E8",border:"1px solid #77A984",color:"#244C2D",fontWeight:"bold",lineHeight:1.6};
const errorStyle={padding:"18px",borderRadius:"14px",backgroundColor:"#FFF0ED",border:"1px solid #C77A6C",color:"#74372C",fontWeight:"bold",lineHeight:1.6};
const honeypotStyle={position:"absolute" as const,left:"-10000px",width:"1px",height:"1px",overflow:"hidden"};
