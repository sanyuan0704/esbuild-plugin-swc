import { Options as SWCOptions, Output, transform, transformSync } from '@swc/core';
import { Plugin, OnLoadArgs, OnLoadResult } from 'esbuild';
import path from 'path';
import fs from 'fs/promises';
import deepmerge from 'deepmerge';

const judgeTS = (p: string): boolean => p.endsWith('.ts') || p.endsWith('.tsx');

export function swcPlugin(options: SWCOptions = {}, isAsync = true): Plugin {
  return {
    name: 'esbuild:swc',
    setup(builder) {
      builder.onResolve({ filter: /\.([tj]sx?)$/ }, (args) => {
        const fullPath = path.resolve(args.resolveDir, args.path);
        return {
          path: fullPath
        }
      });

      builder.onLoad({ filter: /\.([tj]sx?)$/ }, async (args: OnLoadArgs): Promise<OnLoadResult> => {
        const code = await fs.readFile(args.path, 'utf-8');
        const isTS = judgeTS(args.path);
        const isJSX = args.path.endsWith('x');

        const initialOptions: SWCOptions = {
          jsc: {
            parser: {
              syntax: isTS ? 'typescript' : 'ecmascript',
              ...(isTS && isJSX ? { tsx: true } : {}),
              ...(!isTS && isJSX ? { jsx: true } : {}),
            }
          },
          filename: args.path,
          sourceMaps: true,
          sourceFileName: args.path
        };
        
        let result: Output;
        if (isAsync) {
          result = await transform(code, deepmerge(initialOptions, options));
        } else {
          result = transformSync(code, deepmerge(initialOptions, options));
        }
        return {
          contents: result.code,
          loader: 'js'
        }
      })
    }
  }
}