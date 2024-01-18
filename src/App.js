import './App.css';
import React, { useEffect, useMemo, useState } from 'react'
const URL='https://s3.amazonaws.com/open-to-cors/assignment.json'
async function getRecordsFromUrl() {
  try {
    let response = await fetch(URL);
    let responseJson = await response.json();
    return responseJson;
   } catch(error) {
    console.error(error);
    return error;
  }
}
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const App = () => {
  const [records, setRecords] = useState([]);
  const loading = useMemo(() => records?.length === 0, [records]);
  useEffect(() => {
    getRecordsFromUrl()
      .then((data) => {
        let recordsList = [];
        Object.entries(data.products).forEach(([key, value]) => {
          recordsList.push(value)
        });
        return recordsList;
      })
      .then((data) => {
        data.sort((a,b) => (Number(a.popularity) < Number(b.popularity)) ? 1 : ((Number(b.popularity) < Number(a.popularity)) ? -1 : 0));
        return data;
      })
      .then((data) => setRecords(data))
      .catch((error) => alert('Error while fetching records'));
  }, []);
  return (
    <div className="App">
      {
        loading ? <h1>loading</h1> :
        <table>
        <thead>
          <tr>
            <th>Title</th>
                <th>Choice</th>
                {/* <th>Popularity</th> */}
          </tr>
         </thead>
            <tbody>
              {
                records.map((record) =>
                <tr key={makeid(10)}>
                    <td>{ record.title }</td>
                    <td>{ record.price }</td>
                    {/* <td>{record.popularity}</td> */}
                </tr>)
              }
        </tbody>
      </table>
      }
    </div>
  );
}
export default App;