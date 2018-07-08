import os
import json
import sys

ignore_files = ['.DS_Store']
required_config_fields = ['name', 'description']

module_config_file = 'config.json'
mirror_config_file = './client/src/config.json'
modules_path = './client/src/modules/'

modules = []
warnings = []

# Finds a module with `name` in the current mirror config file
def current_config_module_index(current_config, name):
    for index, module in enumerate(current_config):
        if name == module['name']:
            return index
    return None

# Collects all the modules currently in the magic mirror module folder
def index_modules():
    for module in os.listdir(modules_path):
        if module in ignore_files: continue
        module_path = modules_path + module
        module_files = os.listdir(module_path)
        if module_config_file not in module_files:
            warnings.append("WARNING: [%s] Unable to find config.json" % module)
        else:
            config_path = module_path + ("/%s" % module_config_file)
            with open(config_path) as module_config:
                module_info = json.load(module_config)
                config_has_erros = False
                module_data = {}

                for field in required_config_fields:
                    if field not in module_info.keys():
                        warnings.append("WARNING: [%s] '%s' is a required field in config.json. Cannot load module." % (module, field))
                        config_has_erros = True
                        continue
                    else:
                        module_data[field] = module_info[field]
                module_data['position'] = None       

                if not config_has_erros: 
                    modules.append(module_data)

    indexed_modules = {
        'modules': modules,
        'warnings': warnings
    }
    return indexed_modules

def save_modules_to_config(modules):
    with open(mirror_config_file, 'r+') as config_file:
        current_config = json.load(config_file)
        current_config['modules'] = modules
        config_file.seek(0)
        json.dump(current_config, config_file)
        config_file.truncate()

def file_is_empty(file):
    return os.path.getsize(file) <= 0

def update_config_file():
    index = index_modules()
    indexed_modules = index['modules']
    config_modules = []

    if file_is_empty(mirror_config_file):
        save_modules_to_config(indexed_modules)
        return

    with open(mirror_config_file) as current_mirror_config:
        current_mirror_config = json.load(current_mirror_config)
        for module in current_mirror_config['modules']:
            config_modules.append(module)

    if len(config_modules) < 1:
        save_modules_to_config(indexed_modules)
        return

    for module in indexed_modules:
        module_index = current_config_module_index(config_modules, module['name'])
        if module_index != None:
            module['position'] = config_modules[module_index]['position']
        else:
            module['position'] = None

    save_modules_to_config(indexed_modules)

    # NOTE: Warnings are printed to be added to the buffer. The buffer is the
    # return value for the child process in server.js
    print index['warnings']

    sys.stdout.flush()


if __name__ == "__main__": update_config_file()

