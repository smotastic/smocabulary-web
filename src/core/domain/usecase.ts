export interface Usecase<T, V> {
    execute(params: V): Promise<T>;
}

export interface Params {

}