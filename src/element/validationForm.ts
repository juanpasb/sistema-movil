interface messages {
  message: string;
  type: string;
}

interface Details {
  field: string;
  messages: messages[];
}

export const validation = (details: Details[]) => {

  document.querySelectorAll(".text-red-500").forEach((element) => {
      element.innerHTML = "";
    }
  );

  document.querySelectorAll(".border-red-500").forEach((element) => {
      element.classList.remove("border-red-500");
    }
  );

  details.map((detail) => {
    const field = document.getElementById(detail.field);
    if (field) {
      field.classList.add("border-red-500");
      try {
        const element = document.getElementById("span-" + detail.field);
        if (element) {
          element.classList.add("text-red-500");
          element.innerText = detail.messages[0].message;
        }
      } catch (e) {
      }
    }
  });
};