import type {Metadata} from "next";
import {notFound} from "next/navigation";
import LocalizedSite from "../../components/LocalizedSite";
import {getContent} from "../../i18n/content";
import {isLocale, locales} from "../../i18n/config";

type Props={params:Promise<{locale:string;slug?:string[]}>};

export function generateStaticParams(){return locales.map(locale=>({locale}));}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale,slug}=await params;
  if(!isLocale(locale)) return {};
  const key=slug?.join("/")??"";
  const site=getContent(locale);
  const title=key==="home"?site.home.title:key==="rooms"?site.rooms.title:key==="ask-cathy"?undefined:key==="submit-case"?undefined:site.pages[key]?.title;
  return {title:title?`${title} | CWRC`:"The Cathy Was Right Research Center",description:site.entrance.tagline};
}

export default async function LocalizedPage({params}:Props){
  const {locale,slug}=await params;
  if(!isLocale(locale)) notFound();
  return <LocalizedSite locale={locale} slug={slug?.join("/")??""}/>;
}
