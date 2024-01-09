import { MutatingDots } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-indigo-900/30 absolute top-0 left-0">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4338CA"
        secondaryColor="#4F46E5"
        radius="22"
        ariaLabel="mutating-dots-loading"
      />
    </div>
  )
}

export default Loader