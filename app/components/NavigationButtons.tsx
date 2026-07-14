import Link from "next/link";
import type {Locale} from "../i18n/config";
import {localizedHref} from "../i18n/config";
import {getContent} from "../i18n/content";

export default function NavigationButtons({locale = "en"}: {locale?: Locale}) {
  const n=getContent(locale).common.navigation;
  const links=[["home",n.home],["rooms",n.rooms],["ask-cathy",n.ask],["submit-case",n.submit],["development-log",n.log]];
  return <div style={containerStyle}>{links.map(([href,label])=><Link key={href} href={localizedHref(locale,href)} style={buttonStyle}>{label}</Link>)}</div>;
}
const containerStyle={marginTop:"50px",display:"flex",justifyContent:"center",gap:"14px",flexWrap:"wrap" as const};
const buttonStyle={display:"inline-block",padding:"14px 24px",borderRadius:"999px",backgroundColor:"#102A4C",color:"#F7F1E6",textDecoration:"none",fontWeight:"bold",transition:"all 0.25s ease",border:"2px solid #102A4C"};
