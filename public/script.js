let queryData = document.getElementById('reqQuery').value;
const firstSelect = document.getElementById('firstPlatform');
const secondSelect = document.getElementById('secondPlatform');
const diffBox = document.getElementById('diffBox');

queryData = JSON.parse(queryData);

if (queryData.platform1 && queryData.platform2) {
  firstSelect.value = queryData.platform1;
  secondSelect.value = queryData.platform2;
  diffBox.value = queryData.diff;
}