import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './component/card.jsx'

const App = () => {

  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const getdata = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=15`
      );

      setUserData(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    getdata();
  }, [index]);

  return (

    <div className="bg-black min-h-screen w-full p-5 relative">

      {/* Fixed Height Container */}

      <div className="min-h-[85vh] flex justify-center items-center">

        {
          loading ? (

            <h2 className="text-white text-4xl font-bold">
              Loading...
            </h2>

          ) : (

            <div className="flex flex-wrap gap-4 text-white p-2">

              {
                userData.map((elem, idx) => {
                  return (
                    <div key={idx}>
                      <Card elem={elem} />
                    </div>
                  )
                })
              }

            </div>

          )
        }

      </div>

      {/* Static Buttons */}

      <div className="fixed  bottom-5 left-1/2 -translate-x-1/2 flex gap-6 items-center bg-black/80  rounded-xl">

        <button
          type="button"
          disabled={index === 1}
          style={{ opacity: index === 1 ? 0.5 : 1 }}
          onClick={() => {
            if (index > 1) {
              setIndex(index - 1)
            }
          }}
          className="bg-amber-400 text-black rounded px-4 py-2 font-semibold active:scale-95"
        >
          Prev
        </button>

        <h4 className="text-white font-semibold">
          Page {index}
        </h4>

        <button
          type="button"
          onClick={() => {
            setIndex(index + 1)
          }}
          className="bg-amber-400 text-black rounded px-4 py-2 font-semibold active:scale-95"
        >
          Next
        </button>

      </div>

    </div>
  )
}

export default App