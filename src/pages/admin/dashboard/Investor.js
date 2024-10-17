import React from 'react'

const Investor = () => {

  const investorsColum = [
    "Project Id",
    "Project Name",
    "Location",
    "Amount Invested",
    "Developer",
  ];
  const investorListData = [
    ["GP1001","LightUp Lagos",  "Lagos", "200m", "WaveLenght"],
    ["GP1002", "Abuja TradeFair", "Abuja", "100m", "GreenDream"],
    ["GP1003", "GreenBenue", "Benue", "50m", "GreenTrade"],
    ["GP1004","LightUp ABJ",  "Abuja", "150m", "Power Up"],
    ["GP1005", "KogiNG", "Kogi", "250m", "Go Nigeria"],
    ["GP1006", "LightUp Ibadan", "Ibadan", "20m", "WaveLenght"],
    ["GP1007", "LightUp Osun",  "Osun", "50m", "WaveLenght"],
    ["GP1008", "Ogun SolarPower",  "Ogun", "100m", "Power Up"],
    ["GP1009", "Green Edo",  "Edo", "150m", "GreenDream"],
    ["GP10010", "Borno Trafe Fair", "Borno", "100m", "GreenDream"],
    ["GP10011", "Green Borno", "Jos", "50m", "GreenTrade"],
    ["GP10012", "Borno Trafe Fair", "Borno", "100m", "GreenDream"],
    ["GP10013", "Green Borno", "Jos", "50m", "GreenTrade"],
    ["GP10014", "Borno Trafe Fair", "Borno", "100m", "GreenDream"],
    ["GP10015", "Green Borno", "Jos", "50m", "GreenTrade"],
    ["GP10016", "Borno Trafe Fair", "Borno", "100m", "GreenDream"],
    ["GP10017", "Green Borno", "Jos", "50m", "GreenTrade"],
    ["GP10018", "Borno Trafe Fair", "Borno", "100m", "GreenDream"],
    ["GP10019", "Green Borno", "Jos", "50m", "GreenTrade"],
    ["GP10020", "Green Borno", "Jos", "50m", "GreenTrade"],
  ];

  const TableComponent = ({ title, columns, data }) => {
    return (
      <>
        <div>
          <p className="text-l font-semibold text-primary mb-2">{title}</p>
        </div>
        <div
          className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide"
          style={{ height: "88vh", width: "100%" }}
        >
          <table className="min-w-full bg-white ">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="text-left text-xs font-semibold text-primary py-6 px-2 border-b border-gray-300 border-b-2 border-primary"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, index) => (
                    <td
                      key={index}
                      className="text-left text-xs py-3 px-2 border-b border-gray-300"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };


  return (
    <main className="bg-gray-100 min-h-screen p-4 ">
    <TableComponent
            title="Investor(s) List"
            columns={investorsColum}
            data={investorListData}
          />
  </main>
  
  )
}

export default Investor
