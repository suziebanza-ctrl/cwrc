import type {Locale} from "../i18n/config";
import {getContent} from "../i18n/content";

export default function Footer({locale = "en"}: {locale?: Locale}) {
  const common = getContent(locale).common;
  return <footer style={footerStyle}>
    <p style={missionStyle}>The Cathy Was Right Research Center™</p>
    <p style={valuesStyle}>{common.footerValues}</p>
    <p style={copyrightStyle}>{common.copyright}</p>
  </footer>;
}
const footerStyle={backgroundColor:"#102A4C",color:"#F7F1E6",textAlign:"center" as const,padding:"28px 20px",marginTop:"60px"};
const missionStyle={fontWeight:"bold",fontSize:"1.1rem",margin:"0 0 8px"};
const valuesStyle={color:"#D8C49A",margin:"0 0 8px"};
const copyrightStyle={margin:0,fontSize:"0.9rem"};
