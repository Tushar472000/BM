export default function AdSense() {
    return (
        <div>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4937260583648925"
                crossOrigin="anonymous"></script>
            {/* Advertisement code Snippet */}
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4937260583648925"
                data-ad-slot="3193233769"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script>
        </div>
    )
}