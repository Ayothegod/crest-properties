import Footer from "./Footer";
import Header from "./Header";
import HeaderFilter from "./HeaderFilter";

export default function RootLayout({ children }: any) {
  return (
    <main className="font-inter flex flex-col min-h-screen">
      <div className="bg-listing-header-colr">
        <Header />
        <HeaderFilter />
      </div>
      <div className="flex-1 bg-listing-body">{children}</div>
      <Footer />
    </main>
  );
}
