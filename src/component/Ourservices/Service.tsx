const data =[

    {
        title: "Exterior CGI",
        details:"Stunning, lifelike renders that showcase the elegance and structure of buildings."
    },
    {
        title: "Interior CGI",
        details:"Detailed visuals that capture the mood, texture, and essence of interior spaces."
    },
    {
        title: "3D Video Animations",
        details:"Dynamic walkthroughs that provide a cinematic experience of your project."
    },
    {
        title: "360° Virtual Tours",
        details:"Interactive experiences that give your clients a complete perspective."
    }
]

function Service() {
  return (
    <>
    <div className="mx-[200px] mt-[136px]">
    <div className=" p-10 pb-0 text-3xl text-white">What We Do</div>
    <div className=" p-10 w-full h-full flex justify-between gap-10">
     
            {data.map((item, index) => (
                <div key={index} className="mb-10 basis-[30%]">
                    <h3 className=" text-sm font-bold text-[#424241] mb-4">{item.title}</h3>
                    <p className=" text-white">{item.details}</p>
                </div>
            ))}
        
        
    </div>
    </div>
    </>
  )
}

export default Service