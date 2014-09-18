# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API version
VAGRANTFILE_API_VERSION = "2"

# Define local VMs
boxes = [
   {
       :name => "frontend-template",
       :hostname => "frontend-template.vm.com",
       :ip => "192.168.40.51"
   }
]

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    # Set up box
    config.vm.box = "ubuntu-trusty"

    # Hostmanager plugin config
    config.hostmanager.enabled           = true
    config.hostmanager.manage_host       = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.include_offline   = true

    boxes.each do |node|
        config.vm.define node[:name] do |config|
            config.vm.network "private_network", ip: node[:ip]
            config.vm.synced_folder ".", "/vagrant", type: "nfs"
            config.vm.hostname = node[:hostname]

            # VirtualBox machine config
            config.vm.provider "virtualbox" do |v|
                v.name   = node[:name]
                v.memory = 2048
                v.cpus   = 2
            end
        end
    end

    config.ssh.forward_agent = true

    config.vm.provision "ansible" do |ansible|
        ansible.inventory_path      = "provisioning/dev"
        ansible.playbook            = "provisioning/site.yml"
        ansible.limit               = "all"
        ansible.extra_vars          = { ansible_ssh_user: "vagrant" }
    end

    config.vm.provision :hostmanager
end
