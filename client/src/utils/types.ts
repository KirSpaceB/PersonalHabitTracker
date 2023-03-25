export interface getRequest {
  url:string,
}

export interface postRequest {
  method?:string,
  mode?:string,
  cache?:string,
  credentials?:string,
  headers?: {
    content_type?:string,
  },
  redirect?:string,
  referrerPolicy?:string,
}

export interface InputProps {
  type:string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: string;
}

export interface RoutesTypeCheck {
  route:string
}