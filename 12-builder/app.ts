    enum Method {
        Get = "GET",
        Post = "POST",
        Put = "PUT",
        Delete = "DELETE",
        Head = "HEAD",
        Patch = "PATCH",
        Options = "OPTIONS"
    }

    // type HeadersType = {
    //     "Host"?: string,
    //     "User-Agent"?: string,
    //     "Refer"?: string,
    //     "Accept"? : string,
    //     [headerName : string] : string | string[] | undefined;
    // }


    type Options = {
        method: Method,
        headers?: HeadersInit,
        body?: string
    }

    class fetchBuilder {
        constructor(private URL : string = '',
            private options : Options = { method : Method.Get }) {
            
        }

        url(u : string) : fetchBuilder {
            this.URL = u;
            return this;
        }

        method(m : Method) : fetchBuilder {
            this.options.method = m;
            return this;
        }

        headers(h : HeadersInit) : fetchBuilder {
            this.options.headers = {...this.options.headers, ...h};
            return this;
        }

        body(b : any) :fetchBuilder {
            this.options.body = JSON.stringify(b);
            return this;
        }

        async exec() : Promise<any> {
            if (this.URL == '') {
                throw new Error('Нужно добавить ссылку');
            }

            try {
                const res = await fetch(this.URL, this.options);
                if(!res.ok) {
                    throw new Error(`ошибка с кодом ${res.status}`)
                }
                const data = await res.json();
                return data;
            } catch (e) {
                console.error('Ошибка запроса');
                throw new Error((e as Error).message);
            }
            
        }
    }



    async function main() {
        const CL =  await new fetchBuilder()
            .method(Method.Get)
            .url('https://dummyjson.com/test')
            .exec()
        console.log(CL);
    }

    main();