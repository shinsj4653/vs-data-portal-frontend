const LogoCard = ({logo_url, serviceDesc, serviceName}) => {
    return (
        <div className='flex-col w-2/5 items-start pt-20 h-full bg-white p-100'>
            <div className='flex flex-col justify-center items-center space-y-10 w-9/12 h-[58%] bg-white drop-shadow-xl transition duration-300'>
                <div className='flex w-3/4 h-4/6 bg-contain bg-center bg-no-repeat' style={{backgroundImage: `url(${ logo_url })`}} />
                <div className='flex flex-col items-center'>
                    <p className='font-semibold	'>{serviceDesc}</p>
                    <p className='font-black text-xl'>[{serviceName}]</p>  
                </div>  
            </div>
        </div>
    )
}

export default LogoCard;