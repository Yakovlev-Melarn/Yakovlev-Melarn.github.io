const Commands = {
  registry: {},

  register(name, run, aliases, description, hidden) {
    this.registry[name] = {
      name: name,
      run: run,
      aliases: aliases || [],
      description: description || "",
      hidden: !!hidden,
    };
  },

  resolve(name) {
    if (this.registry[name]) return this.registry[name];
    for (const entry of Object.values(this.registry)) {
      if (entry.aliases.indexOf(name) !== -1) return entry;
    }
    return null;
  },

  allNames() {
    const names = [];
    for (const entry of Object.values(this.registry)) {
      if (entry.hidden) continue;
      names.push(entry.name);
      for (const alias of entry.aliases) names.push(alias);
    }
    return names.filter((name, i) => names.indexOf(name) === i);
  },
};

export { Commands };
