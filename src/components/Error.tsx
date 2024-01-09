import { ErrorProps } from "../types/ErrorTypes";

const Error = ({ error }: ErrorProps) => {
  return error ? 
    <span
      className='text-xs text-red-500'
      dangerouslySetInnerHTML={{
        __html: error,
      }}
    />
 : null;
};

export default Error