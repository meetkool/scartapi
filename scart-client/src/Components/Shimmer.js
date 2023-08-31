import React from 'react'

const Shimmer = () => {
    return (
        <>
            <div className="grid grid-cols-4 gap-3 p-5">
                {
                Array(10).fill("").map((item, index) => {
                    return (
                        <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full" key={index}>
                        <div className="animate-pulse flex flex-col space-x-4 ">
                            <div className="rounded bg-slate-400 h-52 w-52 mx-auto mb-4"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-400 rounded"></div>
                                <div className="space-y-3">                                    
                                    <div className="h-2 bg-slate-400 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
            })
            }
            </div>
        </>
    )
}

export default Shimmer
