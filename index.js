/**
 * Searches for a keyword in the table and displays or hides rows accordingly.
 */
function search() {
    /**
     * @type {HTMLInputElement}
     */
    var input, filter, table, tr, td, i, j, txtValue;

    input = document.getElementById("searchKeyword");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        var displayRow = false;
        var row = tr[i];
        for (j = 0; j < row.cells.length; j++) {
            td = row.cells[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    displayRow = true;
                    break;
                }
            }
        }
        if (displayRow) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

/**
 * Sorts an array of table rows using the quicksort algorithm.
 * 
 * @param {HTMLTableRowElement[]} arr - The array of table rows to be sorted.
 * @param {number} columnIdx - The index of the column to be used for sorting.
 * @param {number} low - The starting index for the sort.
 * @param {number} high - The ending index for the sort.
 */
function quickSort(arr, columnIdx, low, high) {
    if (low < high) {
        var pi = partition(arr, columnIdx, low, high);

        quickSort(arr, columnIdx, low, pi - 1);
        quickSort(arr, columnIdx, pi + 1, high);
    }
}

/**
 * Partitions an array of table rows for quicksort.
 * 
 * @param {HTMLTableRowElement[]} arr - The array of table rows to be partitioned.
 * @param {number} columnIdx - The index of the column to be used for partitioning.
 * @param {number} low - The starting index for the partition.
 * @param {number} high - The ending index for the partition.
 * @returns {number} - The pivot index.
 */
function partition(arr, columnIdx, low, high) {
    var pivot = getCellValue(arr[high], columnIdx);
    var i = low - 1;

    for (var j = low; j < high; j++) {
        var currentVal = parseFloat(arr[j].getElementsByTagName("td")[columnIdx].textContent);

        if (currentVal <= pivot) {
            i++;

            var temp = arr[i].innerHTML;
            arr[i].innerHTML = arr[j].innerHTML;
            arr[j].innerHTML = temp;
        }
    }

    var temp = arr[i + 1].innerHTML;
    arr[i + 1].innerHTML = arr[high].innerHTML;
    arr[high].innerHTML = temp;

    return i + 1;
}

/**
 * Gets the numeric cell value from a table row based on the column index.
 * 
 * @param {HTMLTableRowElement} row - The table row.
 * @param {number} columnIdx - The index of the column.
 * @returns {number} - The numeric value of the cell.
 */
function getCellValue(row, columnIdx) {
    var cell = row.getElementsByTagName("td")[columnIdx];
    return cell ? parseFloat(cell.textContent) : 0;
}

/**
 * Sorts the table based on the selected column and direction.
 */
function sortTable() {
    /**
     * @type {number}
     */
    var columnIdx = 3; // Index of the 4th column - average_rating

    /**
     * @type {string}
     */
    var sortDirection = document.getElementById("sortColumn").value;

    /**
     * @type {HTMLTableElement}
     */
    var table = document.getElementById("dataTable");

    /**
     * @type {NodeListOf<HTMLTableRowElement>}
     */
    var rows = table.getElementsByTagName("tr");

    // Convert NodeList to Array for sorting
    var rowsArray = Array.from(rows);

    // Extract the first row (original data)
    var firstRow = rowsArray.shift();

    // Sorting using quicksort
    quickSort(rowsArray, columnIdx, 1, rowsArray.length - 1);

    // Reverse the array if sorting in descending order
    if (sortDirection === "desc") {
        rowsArray.reverse();
    }

    // Clear the current table
    table.innerHTML = "";

    // Append the first row back to the table
    table.appendChild(firstRow);

    // Append sorted rows back to the table
    for (var i = 1; i < rowsArray.length; i++) {
        table.appendChild(rowsArray[i]);
    }
}

document.getElementById("csvFileInput").addEventListener("change", function() {
    /**
     * @type {HTMLInputElement}
     */
    var fileInput = this;

    /**
     * @type {File}
     */
    var file = fileInput.files[0];
    
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var csvData = e.target.result;
            displayCSVData(csvData);
        };
        reader.readAsText(file);
    }
});

/**
 * Displays CSV data in the table.
 * 
 * @param {string} csvData - The CSV data to be displayed.
 */
function displayCSVData(csvData) {
    /**
     * @type {string[]}
     */
    var lines = csvData.split("\n");

    /**
     * @type {string}
     */
    var tableContent = "";

    if (lines.length > 0) {
        // Generate table headers using the first row of CSV data
        var headers = lines[0].split(",");
        tableContent += "<tr>";
        for (var i = 0; i < headers.length; i++) {
            tableContent += "<th>" + headers[i] + "</th>";
        }
        tableContent += "</tr>";
    }

    for (var i = 1; i < lines.length; i++) {
        var cells = lines[i].split(",");
        if (cells.length > 0) {
            tableContent += "<tr>";
            for (var j = 0; j < cells.length; j++) {
                tableContent += "<td>" + cells[j] + "</td>";
            }
            tableContent += "</tr>";
        }
    }

    document.getElementById("dataTable").innerHTML = tableContent;
}
