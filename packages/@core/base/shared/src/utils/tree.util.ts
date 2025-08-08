interface TreeConfigOptions {
  // The name of the child property, defaults to 'children'
  childProps: string;
}

/**
 * Traverse the tree structure and return the specified values from all nodes.
 * @param params
 * @param params.tree Array of tree structure
 * @param params.getValue Function to get the value of a node
 * @param params.options Optional property name for the child nodes array.
 *
 * @returns Array of specified values from all nodes
 */
export function traverseTreeValues<T, V>(
  { tree, getValue, options }:
  {
    getValue: (node: T) => V;
    options?: TreeConfigOptions;
    tree: Array<T>;
  },
): Array<V> {
  const result: Array<V> = [];

  const { childProps } = options || {
    childProps: 'children',
  };

  function dfs(treeNode: T) {
    const value = getValue(treeNode);

    result.push(value);

    const children = (treeNode as Record<string, any>)?.[childProps];

    if (!children) {
      return;
    }

    if (children.length > 0) {
      for (const child of children) {
        dfs(child);
      }
    }
  }

  for (const node of tree) {
    dfs(node);
  }

  return result.filter(Boolean);
}

/**
 * Filter the nodes of the given tree structure based on a condition and
 * return an array of all matching nodes in the original order.
 *
 * @param params
 * @param params.tree Array of root nodes of the tree structure to be filtered.
 * @param params.filter Condition to match each node.
 * @param params.options Optional property name for the child nodes array.
 * @returns Array containing all matching nodes.
 */
export function filterTree<T extends Record<string, any>>(
  { tree, filter, options }:
  {
    filter: (node: T) => boolean;
    options?: TreeConfigOptions;
    tree: Array<T>;
  },
): Array<T> {
  const { childProps } = options || {
    childProps: 'children',
  };

  function filterTree_(nodes: Array<T>): Array<T> {
    return nodes.filter((node: Record<string, any>) => {
      if (filter(node as T)) {
        if (node[childProps]) {
          node[childProps] = filterTree_(node[childProps]);
        }

        return true;
      }

      return false;
    });
  }

  return filterTree_(tree);
}

/**
 * Remap the nodes of the given tree structure based on a condition.
 *
 * @param params
 * @param params.tree Array of root nodes of the tree structure to be mapped.
 * @param params.mapper Function to map each node.
 * @param params.options Optional property name for the child nodes array.
 */
export function mapTree<T, V extends Record<string, any>>(
  { tree, mapper, options }:
  {
    mapper: (node: T) => V;
    options?: TreeConfigOptions;
    tree: Array<T>;
  },
): Array<V> {
  const { childProps } = options || {
    childProps: 'children',
  };
  return tree.map((node) => {
    const mapperNode: Record<string, any> = mapper(node);
    if (mapperNode[childProps]) {
      mapperNode[childProps] = mapTree({
        tree: mapperNode[childProps],
        mapper,
        options,
      });
    }
    return mapperNode as V;
  });
}
