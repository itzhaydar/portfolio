document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".site-nav a");
  const sections = document.querySelectorAll("main section[id]");
  const copyButton = document.querySelector(".copy-status");
  const emailLink = document.querySelector(".email-copy");

  // Highlight the navigation item for the section currently in view.
  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 140) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentSection}`;
      link.classList.toggle("active", isActive);
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // Copy the email address without interrupting the page.
  if (copyButton && emailLink) {
    copyButton.addEventListener("click", async () => {
      const email = emailLink.dataset.email;

      try {
        await navigator.clipboard.writeText(email);

        copyButton.textContent = "Copied";

        setTimeout(() => {
          copyButton.textContent = "Copy email";
        }, 1800);
      } catch {
        copyButton.textContent = "Copy failed";

        setTimeout(() => {
          copyButton.textContent = "Copy email";
        }, 1800);
      }
    });
  }
});
