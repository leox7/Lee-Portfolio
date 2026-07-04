// Mobile overlay menu
class MobileMenu {
  constructor() {
    this.btn = document.getElementById("menuBtn");
    this.menu = document.getElementById("mobileMenu");
    this.isOpen = false;

    this.init();
  }

  init() {
    this.btn.addEventListener("click", () => this.toggle());

    // Close when a menu link is clicked
    this.menu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.menu.classList.add("open");
    this.btn.classList.add("open");
    this.btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.isOpen = false;
    this.menu.classList.remove("open");
    this.btn.classList.remove("open");
    this.btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
}

// Smooth Scrolling for anchor links
class SmoothScrolling {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    });
  }
}

// Contact Form Handler (EmailJS)
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const submitBtn = this.form.querySelector("button[type=submit]");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      // Get form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData);

      // Send email using EmailJS
      await emailjs.send(
        "gmail_id", // EmailJS service ID
        "leo_temp", // temp id email js
        {
          from_name: data.name,
          reply_to: data.email,
          subject: data.subject,
          message: data.message,
        }
      );

      this.showMessage(
        "Thank you for your message! I'll get back to you soon.",
        "success"
      );
      this.form.reset();
    } catch (error) {
      console.error("Error:", error);
      this.showMessage(
        "Sorry, there was an error sending your message. Please try again.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  showMessage(message, type) {
    const messageEl = document.createElement("div");
    messageEl.textContent = message;
    messageEl.className = `toast ${type === "error" ? "error" : ""}`;

    document.body.appendChild(messageEl);

    setTimeout(() => {
      messageEl.classList.add("out");
      setTimeout(() => messageEl.remove(), 300);
    }, 5000);
  }
}

// Reveal-on-scroll animations
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }
}

// Statement: words light up progressively as you scroll (Framer-style)
class StatementReveal {
  constructor() {
    this.el = document.getElementById("statementText");
    if (!this.el) return;

    // Split text into word spans
    const words = this.el.textContent.trim().split(/\s+/);
    this.el.innerHTML = words
      .map((w) => `<span class="w">${w}</span>`)
      .join(" ");
    this.words = this.el.querySelectorAll(".w");

    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.onScroll();
  }

  onScroll() {
    const rect = this.el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Progress: 0 when the text enters the lower viewport, 1 when its
    // bottom clears the upper third of the screen
    const start = vh * 0.85;
    const end = vh * 0.35;
    const progress = (start - rect.top) / (start - end + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));
    const lit = Math.floor(clamped * this.words.length);

    this.words.forEach((w, i) => w.classList.toggle("lit", i < lit));
  }
}

// Header: hide on scroll down, show on scroll up
class HeaderScrollEffect {
  constructor() {
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    let lastScrollY = window.scrollY;

    window.addEventListener(
      "scroll",
      () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 140 && currentScrollY > lastScrollY) {
          this.header.classList.add("hidden");
        } else {
          this.header.classList.remove("hidden");
        }

        lastScrollY = currentScrollY;
      },
      { passive: true }
    );
  }
}

// Footer year
class FooterYear {
  constructor() {
    const el = document.getElementById("year");
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MobileMenu();
  new SmoothScrolling();
  new ContactForm();
  new ScrollAnimations();
  new StatementReveal();
  new HeaderScrollEffect();
  new FooterYear();
});
