console.log("Main.js working");

const populateTable = (data, value) => {
    let tableBodyHtml = "";
    for (let key of Object.keys(data)) {
        tableBodyHtml += `
            <tr>
                <td>${key}</td>
                <td>${data[key]["code"]}</td>
                <td>${Math.round(data[key]["value"] * value)}</td>
            </tr>
        `;
    }
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = tableBodyHtml;
};

const fetchData = async (currency) => {
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_7UStkUqQNBmahSoy8K635tE3Sjr5fK1UVPmVloZ2&base_currency=${currency}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        document.querySelector(".output").style.display = "block";
        return jsonData.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error (e.g., display a message to the user)
        return null;
    }
};

const btn = document.querySelector(".btn");

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;

    const data = await fetchData(currency);

    if (data) {
        populateTable(data, value);
    }
});
