let allEvents = [];
let portsData = null; // Hold processed ports data

// Define fetchCredits outside the listener
async function fetchCredits() {
  try {
    const response = await fetch('./html/credits.html');
    if (!response.ok) throw new Error('Failed to fetch credits.html');
    return await response.text();
  } catch (error) {
    console.error('Error fetching credits:', error);
    return '<p>Error loading credits</p>';
  }
}

document.addEventListener("DOMContentLoaded", async () => {
    //const calendarEl = document.getElementById("calendar");
    const showHelpersCheckbox = document.getElementById("showHelpers");
    const openFormButton = document.getElementById("openFormButton");
    const openFeedbackButton = document.getElementById("openFeedbackButton");
    //const eventModal = document.getElementById("eventModal");
    //const modalTitle = document.querySelector(".modal-title");
    //const modalStart = document.querySelector(".modal-start");
    //const modalEnd = document.querySelector(".modal-end");
    //const modalOrigin = document.querySelector(".modal-origin");
    //const modalDestination = document.querySelector(".modal-destination");
    //const modalContactIcon = document.querySelector(".modal-contact-icon");
    //const modalContact = document.querySelector(".modal-contact");
    //const modalMessage = document.querySelector(".modal-message");
    //const modalFlight = document.querySelector(".modal-flight");
    //const modalRole = document.querySelector(".modal-role");
    //const modalLanguages = document.querySelector(".modal-languages");
    const closeModal = document.querySelector(".close");
    //const chevronLeft = document.querySelector(".chevron.left");
    //const chevronRight = document.querySelector(".chevron.right");
    //const copyButton = document.querySelector(".copy-button");
    //const messageToggle = document.querySelector(".message-toggle");
    //const profilePopup = document.getElementById("profilePopup");
    const closePopup = document.querySelector(".close-popup");
    const profileImg = document.querySelector(".profile-img");
    const profilePopupContent = document.getElementById("profilePopupContent");

    let currentEventIndex = -1;

  // Load ports data asynchronously
  try {
    const { getPortOptions } = await import("./constants.js"); // Dynamic import
    const options = await getPortOptions(); // Get flat array of options
    // Structure it for origin and destination
    portsData = [
      { name: "origin", options: options },
      { name: "destination", options: options }
    ];
  } catch (error) {
    console.error("Failed to load ports:", error);
    return; // Exit if ports fail to load
  }

  /*const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "listMonth",
    initialDate: new Date().toISOString().split("T")[0],
    headerToolbar: { left: "prev,next today", center: "title", right: "listMonth,listWeek,dayGridMonth" },
    buttonText: { listWeek: "Weekly List", listMonth: "Monthly List", dayGridMonth: "Monthly Grid"},
    height: "calc(100vh - 170px)",
    dayMaxEvents: 3,
    events: fetchEvents,
    eventOverlap: true,
    eventDataTransform: (event) => {
      event.backgroundColor = event.extendedProps.type === "Offering Help" ? "#FFA500" : "#3788d8";
      event.borderColor = event.backgroundColor;
      return event;
    },
    eventContent: (arg) => {
      const props = arg.event.extendedProps;
      const isHelper = props.type === "Offering Help" ? " helper" : "";
      return {
        html: `
          <div class="fc-event-custom${isHelper}">
            <div class="title">${arg.event.title}</div>
            <div class="route">
              <span class="origin">${props.origin}</span>
              <span class="flight">${props.flight || ""}</span>
              <span class="destination">${props.destination}</span>
            </div>
            ${props.message ? `<div class="message truncated">${props.message}</div>` : ""}
          </div>
        `,
      };
    },
    eventClick: (info) => {
      const allFilteredEvents = calendar.getEvents();
      currentEventIndex = allFilteredEvents.findIndex((e) => e.id === info.event.id);
      if (currentEventIndex === -1) return;
      updateModal(info.event);
      eventModal.style.display = "block";
    },
  });*/

  //setupSearchableSelect("origin", calendar);
  //setupSearchableSelect("destination", calendar);

  //calendar.render();

  /*fetchEvents(null, (events) => {
    allEvents = events;
    applyFilters(calendar);
  }, (error) => console.error("Fetch error:", error));*/

  //showHelpersCheckbox.addEventListener("change", () => applyFilters(calendar));
  openFormButton.addEventListener("click", () =>
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSftIxuQVKmG5Pf4TsXlq0Uivcm01flAjIJH29ko8-ttt5U7pw/viewform", "_blank")
  );
  openFeedbackButton.addEventListener("click", () =>
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSf4uXPSCc4LixrFTcmdYioN4wLlmsjjTSwcUBFEy8nfMAll4A/viewform", "_blank")
  );
  //Add a FAQ Page, static website with more information on general things.
  //Recent News/info things
  closeModal.addEventListener("click", () => (eventModal.style.display = "none"));
  window.addEventListener("click", (event) => {
    if (event.target === eventModal) eventModal.style.display = "none";
  });
  //chevronLeft.addEventListener("click", () => navigateEvent(-1));
  //chevronRight.addEventListener("click", () => navigateEvent(1));
  /*copyButton.addEventListener("click", () => {
    const contactInfo = modalContact.textContent;
    if (contactInfo && contactInfo !== "N/A") {
      navigator.clipboard.writeText(contactInfo)
        .then(() => alert("Contact copied to clipboard!"))
        .catch(() => alert("Failed to copy contact. Please try manually."));
    }
  });*/
  /*messageToggle.addEventListener("click", () => {
    modalMessage.classList.toggle("expanded");
    messageToggle.textContent = modalMessage.classList.contains("expanded") ? "Show Less" : "Show More";
  });*/

  // Profile Popup Functionality
  profileImg.addEventListener("click", async () => {
    profilePopup.style.display = "block";
    
    profilePopupContent.innerHTML = await fetchCredits(); // Use innerHTML to render the link
  });

  closePopup.addEventListener("click", () => {
    profilePopup.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === profilePopup) {
      profilePopup.style.display = "none";
    }
  });

  /*function updateModal(event) {
    modalTitle.textContent = event.title;
    modalStart.textContent = event.start ? event.start.toLocaleString() : "N/A";
    modalEnd.textContent = event.end ? event.end.toLocaleString() : "N/A";
    modalOrigin.textContent = event.extendedProps.origin || "N/A";
    modalDestination.textContent = event.extendedProps.destination || "N/A";
    const contactType = event.extendedProps.contactType || "N/A";
    const contactInfo = event.extendedProps.contactInfo || "N/A";
    modalContactIcon.className = `detail-value modal-contact-icon ${contactType.toLowerCase()}`;
    modalContact.textContent = contactInfo;
    modalContact.className = "detail-value modal-contact";
    if (contactInfo !== "N/A") {
      if (contactType === "Email") {
        modalContact.href = `mailto:${contactInfo}`;
        modalContact.title = `Send email to ${contactInfo}`;
      } else if (contactType === "Instagram") {
        let cleanedContactInfo = contactInfo;
        if (contactInfo.includes('https://instagram.com/')) {
            cleanedContactInfo = contactInfo.replace('https://instagram.com/', '');
        }
        modalContact.href = `https://instagram.com/${cleanedContactInfo}`;
        modalContact.title = `View Instagram profile ${contactInfo}`;
      } else {
        modalContact.removeAttribute("href");
        modalContact.title = "";
      }
    } else {
      modalContact.removeAttribute("href");
      modalContact.title = "";
    }
    const clickHandler = (e) => {
      e.preventDefault();
      if (modalContact.href && confirm(`Open ${contactType.toLowerCase()}?`)) {
        window.open(modalContact.href, "_blank");
      }
    };
    modalContact.removeEventListener("click", modalContact._clickHandler);
    modalContact.addEventListener("click", clickHandler);
    modalContact._clickHandler = clickHandler;

    const message = event.extendedProps.message || "N/A";
    modalMessage.textContent = message;
    messageToggle.style.display = message.length > 100 ? "inline" : "none";
    modalMessage.classList[message.length > 100 ? "remove" : "add"]("expanded");

    modalLanguages.textContent = event.extendedProps.languages?.split(",").join(", ") || "N/A";
    const allFilteredEvents = calendar.getEvents();
    chevronLeft.style.visibility = currentEventIndex === 0 ? "hidden" : "visible";
    chevronRight.style.visibility = currentEventIndex === allFilteredEvents.length - 1 ? "hidden" : "visible";
    modalFlight.textContent = event.extendedProps.flight || "N/A";
    modalRole.textContent = event.extendedProps.type || "N/A";
    modalRole.className = "detail-value modal-role" + (event.extendedProps.type === "Offering Help" ? " helper" : " traveler");
  }*/

  /*function navigateEvent(direction) {
    const allFilteredEvents = calendar.getEvents();
    currentEventIndex = Math.max(0, Math.min(allFilteredEvents.length - 1, currentEventIndex + direction));
    if (allFilteredEvents.length) updateModal(allFilteredEvents[currentEventIndex]);
  }*/

  /*function applyFilters(calendar) {
    const getSelectedValues = (filterName) =>
      Array.from(document.getElementById(`${filterName}-options`).querySelectorAll(".option-item.selected"))
        .map((tag) => tag.dataset.value.toUpperCase());

    const originFilters = getSelectedValues("origin");
    const destinationFilters = getSelectedValues("destination");
    const showHelpers = showHelpersCheckbox.checked;

    const filteredEvents = allEvents.filter((event) => {
      const eventOrigin = event.extendedProps.origin?.toUpperCase() || "";
      const eventDestination = event.extendedProps.destination?.toUpperCase() || "";
      const originMatch = !originFilters.length || originFilters.includes("SELECTALL") || originFilters.includes(eventOrigin);
      const destMatch = !destinationFilters.length || destinationFilters.includes("SELECTALL") || destinationFilters.includes(eventDestination);
      const typeMatch = !showHelpers || event.extendedProps.type === "Offering Help";
      return originMatch && destMatch && typeMatch;
    });
    calendar.setOption("events", filteredEvents);
    calendar.render();
  }*/

  /*function setupSearchableSelect(filterName, calendar) {
    const input = document.getElementById(`${filterName}-input`);
    const optionsContainer = document.getElementById(`${filterName}-options`);
    const filterData = portsData.find((f) => f.name === filterName);
    if (!filterData || !filterData.options) {
      console.error(`No options found for ${filterName} in ports`);
      return;
    }

    const allOptions = filterData.options; // Already includes "SelectAll" from getPortOptions
    let selectedValues = new Set(["SelectAll"]);
    let typingTimeout;

    const renderOptions = (searchTerm = "") => {
      optionsContainer.innerHTML = "";
      
      const selectedOptions = allOptions.filter(opt => selectedValues.has(opt.value));
      selectedOptions.slice(0, 5).forEach((opt) => {
        const div = document.createElement("div");
        div.className = "option-item selected";
        div.textContent = `✓ ${opt.label}`;
        div.dataset.value = opt.value;
        div.addEventListener("click", () => {
          selectedValues.delete(opt.value);
          if (selectedValues.size === 0) selectedValues.add("SelectAll");
          renderOptions(input.value); // Re-render options
          applyFilters(calendar);
          input.value = ""; // Clear the search term after selection
        });
        optionsContainer.appendChild(div);
      });

      if (selectedOptions.length > 0) {
        const hr = document.createElement("hr");
        hr.style.borderColor = "#26a69a";
        optionsContainer.appendChild(hr);
      }

      const filteredOptions = allOptions.filter(
        (opt) => !selectedValues.has(opt.value) && 
                 (opt.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  opt.value.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      filteredOptions.slice(0, 5 - selectedOptions.length).forEach((opt) => {
        const div = document.createElement("div");
        div.className = "option-item";
        div.textContent = opt.label;
        div.dataset.value = opt.value;
        div.addEventListener("click", () => {
          if (opt.value === "SelectAll") {
            selectedValues.clear();
            selectedValues.add("SelectAll");
          } else {
            selectedValues.delete("SelectAll");
            selectedValues.add(opt.value);
          }
          renderOptions(input.value); // Re-render options
          applyFilters(calendar);
          input.value = ""; // Clear the search term after selection
        });
        optionsContainer.appendChild(div);
      });

      optionsContainer.style.display = optionsContainer.children.length ? "block" : "none";
    };

    input.addEventListener("input", (e) => {
      clearTimeout(typingTimeout);
      renderOptions(e.target.value);
      typingTimeout = setTimeout(() => {
        optionsContainer.style.display = "none";
      }, 5000);
    });

    input.addEventListener("focus", () => {
      clearTimeout(typingTimeout);
      renderOptions(input.value);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && optionsContainer.children.length > 0) {
        const firstUnselected = optionsContainer.querySelector(".option-item:not(.selected)");
        if (firstUnselected) firstUnselected.click();
      }
    });

    document.addEventListener("click", (e) => {
      if (!input.parentElement.contains(e.target)) {
        clearTimeout(typingTimeout);
        optionsContainer.style.display = "none";
      }
    });
  }*/

  /*async function fetchEvents(fetchInfo, successCallback, failureCallback) {
    try {
      const response = await fetch("/data/events.csv");
      const csvText = await response.text();
      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          const events = result.data
            .map((row) => {
              const parseDateTime = (dateTimeStr) => {
                if (!dateTimeStr || typeof dateTimeStr !== "string") return "";
                const [date, time] = dateTimeStr.split(" ");
                if (!date) return "";
                const [day, month, year] = date.split("/");
                if (!day || !month || !year) return "";
                return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}${time ? "T" + time : ""}`;
              };

              const start = parseDateTime(row["Departure"]);
              let end = parseDateTime(row["Arrival"]);
              if (!end && start) {
                const endDate = new Date(start);
                endDate.setHours(endDate.getHours() + 1);
                end = endDate.toISOString().replace(".000Z", "");
              }
              if (!start) return null;

              const contactType = row["Contact"] || "N/A";
              let contactInfo = "N/A";
              if (contactType === "Email") contactInfo = row["Email ID"] || "N/A";
              else if (contactType === "Phone") contactInfo = row["Phone"] || "N/A";
              else if (contactType === "Instagram") contactInfo = row["Instagram ID"] || "N/A";

              return {
                title: row["Title"],
                start,
                end,
                extendedProps: {
                  contactType,
                  contactInfo,
                  origin: row["Source"],
                  type: row["Participation Role"] || "Seeking Help",
                  destination: row["Destination"],
                  message: row["Message"] || "",
                  flight: row["Flight Code"],
                  languages: row["Languages you speak"],
                },
              };
            })
            .filter((event) => event && event.title);
          successCallback(events);
        },
      });
    } catch (error) {
      failureCallback(error);
    }
  }*/
});