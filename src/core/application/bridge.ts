/**
 * Sets up a bridge between two features. A feature is not allowed to speak to another feature without using a defined bridge.
 * This helps identifying overlapping features.
 */
export interface Bridge<T, R> {
    connect(value: T): R
}