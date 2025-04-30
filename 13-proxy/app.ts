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

    interface IfetchBuilder {
        url(u : string) : fetchBuilder;
        method(m : Method) : fetchBuilder;
        headers(h : HeadersInit) : fetchBuilder;
        body(b : any) : fetchBuilder;
        exec() : Promise<any>;
    }
 
    class fetchBuilder  implements IfetchBuilder{
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

    class Api implements IfetchBuilder {
        private f: fetchBuilder;
        constructor(f: fetchBuilder) {
            this.f = f;
        }

        url(u: string): fetchBuilder {
            this.f.url(u);
            return this.f;
        }
        method(m: Method): fetchBuilder {
            this.f.method(m);
            return this.f
        }
        headers(h: HeadersInit): fetchBuilder {
            this.f.headers(h);
            return this.f;
        }
        body(b: any): fetchBuilder {
            this.f.body(b);
            return this.f;
        }
        async exec(): Promise<any> {
            const res = await this.f.exec();
            if (res.id > 10) {
                throw new Error('id больше 10');
            } else {
                return res;
            }
        }

    }

    async function main() {
        try {
            const res = await new Api(new fetchBuilder('https://dummyjson.com/products/1')).exec();
            console.log(res);
        } catch(e) {
            throw new Error((e as Error).message);
        }
    }

    main();