// Header element
class customHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
        <header>
			<div class="header-container">
				<div class="titleDiv">
					<img class="logo" src="../images/logo.webp" alt="logo"/>
					<h1 class="title">Happy Horizons</h1>
				</div>
				<nav class="navBar">
					<a class="navLink" href="/index.html">Home</a>
					<a class="navLink" href="/navigate/myPortal.html">MyPortal</a>
					<a class="navLink" href="/navigate/ticket.html">Open Ticket</a>
					<a class="navLink" href="/navigate/contactUs.html">Contact Us</a>
					<a class="navLink" href="/navigate/admin.html">Admin</a>
				</nav>
				<button class="hamburger">
				<div class="bar"></div>
				</button>
				<nav class="mobileNav border">
					<a class="mobileNavLink" href="/index.html">Home</a>
					<a class="mobileNavLink" href="/navigate/myPortal.html">MyPortal</a>
					<a class="mobileNavLink" href="/navigate/ticket.html">Open Ticket</a>
					<a class="mobileNavLink" href="/navigate/contactUs.html">Contact Us</a>
					<a class="mobileNavLink" href="/navigate/admin.html">Admin</a>
					
				</nav>
			</div>
		</header>
		
        `;
	}
}

customElements.define("custom-header", customHeader)


// Footer element
class customFooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<div class="footer-container">
			<nav class="footerNav">
				<a href="https://www.facebook.com/" class="icon facebook">
					<div class="tooltip fb">Facebook</div>
					<span><i class="fab fa-facebook-f"></i></span>
				</a>
				<a href="https://www.instagram.com/" class="icon insta">
					<div class="tooltip ig">Instagram</div>
					<span><i class="fab fa-instagram"></i></span>
				</a>
				<a href="https://twitter.com/" class="icon twitter">
					<div class="tooltip tw">Twitter</div>
					<span><i class="fab fa-twitter"></i></span>
				</a>
			</nav>
		</div>
		`;
	}
}

customElements.define("custom-footer", customFooter)