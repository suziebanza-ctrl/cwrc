import type {Locale} from "../i18n/config";
import Footer from "./Footer";
import Header from "./Header";
import NavigationButtons from "./NavigationButtons";

export default function PageLayout({children,locale="en",navigation=true}:{children:React.ReactNode;locale?:Locale;navigation?:boolean}) {
  return <main style={pageStyle}><Header locale={locale}/><section style={contentStyle}>{children}{navigation&&<NavigationButtons locale={locale}/>}</section><Footer locale={locale}/></main>;
}
const pageStyle={minHeight:"100vh",backgroundColor:"#F7F1E6",color:"#102A4C",fontFamily:"Georgia, serif"};
const contentStyle={maxWidth:"1100px",margin:"48px auto",backgroundColor:"#FFFDF8",borderRadius:"24px",padding:"48px 32px",boxShadow:"0 20px 50px rgba(16, 42, 76, 0.15)"};
