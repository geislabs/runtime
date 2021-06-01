import type fs from 'fs'

type FS = typeof fs

export interface FileSystem extends FS {}
