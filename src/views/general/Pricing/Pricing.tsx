import Packages from "./components/Packages"

const Pricing = () => {
  return (
    <div className="w-full px-5">
      <div className="">
        <h2 className="text-center">Smart tech with smart pricing</h2>
        <div className="flex justify-center mt-5">
          <p className="text-center max-w-[600px]">
            Like someone once said: “Buttlicker, our prices have never been lower! In our case it’s true, our prices are even lower in  yearlyt plan
          </p>
        </div>
        <Packages/>
      </div>
    </div>
  )
}

export default Pricing