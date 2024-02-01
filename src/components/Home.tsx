/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useState } from "react"

export default function Home() {
  const [data, setData] = useState([
    {
      id: "1",
      text: "1",
      children: [],
    },
  ])

  const setNewdata = (targetId: string, item: any) => {
    if (item.id == targetId) {
      return {
        ...item,
        children: [
          ...item.children.map((child: any) => setNewdata(targetId, child)),
          {
            id: `${targetId}.${item.children.length + 1}`,
            text: `${targetId}.${item.children.length + 1}`,
            children: [],
          },
        ],
      }
    } else {
      return {
        ...item,
        children: item.children.map((child: any) =>
          setNewdata(targetId, child)
        ),
      }
    }
  }

  const handleAdd = (id: string) => {
    const preArr = data
    const newArr = preArr.map((item) => {
      return setNewdata(id, item)
    })
    setData(newArr)
    showData(newArr[0])
  }

  const setNewDeletedata = (id: string, parentId: string, item: any) => {
    if (item.id == parentId) {
      return {
        ...item,
        children: [
          ...item.children
            .filter((i: any) => i.id != id)
            .map((child: any) => setNewDeletedata(id, parentId, child)),
        ],
      }
    } else {
      return {
        ...item,
        children: item.children.map((child: any) =>
          setNewDeletedata(id, parentId, child)
        ),
      }
    }
  }

  function handleDelete(id: string) {
    const parentId = id.toString().split(".").slice(0, -1).join(".")
    const preArr = data
    const newArr = preArr.map((item) => {
      return setNewDeletedata(id, parentId, item)
    })

    setData(newArr)
    showData(newArr[0])
  }

  function showData(item: any) {
    return (
      <div className="mt-6">
        <div
          key={item.id}
          className="flex justify-center gap-4 relative top-0 left-0"
        >
          <div className="flex flex-col rounded bg-gray-100 w-fit p-2 px-5">
            <div>
              <p className="font-mono text-base text-center">Node</p>
              <p className="font-mono text-base text-center">{item.text}</p>
            </div>
            <div className="flex gap-2 justify-center mt-2">
              <button
                className="bg-green-200 cursor-pointer"
                onClick={() => handleAdd(item?.id)}
              >
                <i className="fa-solid fa-plus text-green-800 px-1 font-bold"></i>
              </button>
              {item.id != "1" && (
                <button
                  className="bg-red-200 cursor-pointer"
                  onClick={() => handleDelete(item?.id)}
                >
                  <i className="fa-solid fa-trash text-red-800 px-1"></i>
                </button>
              )}
            </div>
          </div>

          {item?.children?.length == 0 ? null : (
            <span className="w-1 h-5 absolute bottom-[-27%] right-[50%] bg-green-800 z-10"></span>
          )}
          {item.id != "1" && (
            <span className="w-1 h-6 absolute top-[-25%] right-[50%] bg-green-800 z-10"></span>
          )}
        </div>
        {item?.children?.length == 0 ? null : (
          <div className="flex justify-center gap-4 mt-6 border-b-0 border-t-2 border-green-800">
            {item?.children?.map((item: { id: Key | null | undefined }) => {
              return <div key={item.id}>{showData(item)}</div>
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      {/* heading */}
      <h1 className="text-3xl font-bold font-mono text-center">
        Hierarchy Tree
      </h1>
      {/* content */}
      <section className="flex gap-4 py-14 overflow-x-auto min-h-[92vh]">
        {data.map((item) => {
          return <div key={item.id}>{showData(item)}</div>
        })}
      </section>
    </div>
  )
}
