const data =[

    {
        title: "IMAGERY",
        details:"Engaging images for marketing and competitions, from large urban to architecture scale. Our CGIs are recognized by their level of quality with a competitive turnaround using the latest smart parametric and procedural modelling software."
    },
    {
        title: "ANIMATION",
        details:"Tell a story with an animation - created from scratch using the virtual environments, sound design, visual FX and cutting-edge motion graphics."
    },
    {
        title: "VIRTUAL REALITY",
        details:"Realtime-rendered environments for urban designers, architects or developers. Our development team are constantly working on solutions that offer an immersive environment for design development and high end marketing."
    }
]

function Service() {
  return (
    <>
    <div className="mx-[345px] mt-[136px]">
    <div className=" p-10 pb-0 text-3xl text-white">Our <strong>Service</strong></div>
    <div className=" p-10 w-full h-full flex justify-between">
     
            {data.map((item, index) => (
                <div key={index} className="mb-10 basis-[30%]">
                    <h3 className=" text-sm font-medium text-[#f9cf27] mb-4">{item.title}</h3>
                    <p className=" text-white">{item.details}</p>
                </div>
            ))}
        
        
    </div>
    </div>
    </>
  )
}

export default Service