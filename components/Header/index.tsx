import MainNavbar from "./MainNavbar";
import TopNavbar from "./TopNavbar";
export default function Header() {
  return (
    <div className='fixed top-0 z-50 w-full'>
      <TopNavbar />
      <MainNavbar />
    </div>
  );
}
