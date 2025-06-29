Ansible-Docker - Crowdfunding

This README contains information on how to set up crowdfunding frontend
and backend on the same device and make it publically available using nginx.

1. Install ansible-playbook on your machine (NOT the target machine).
2. Make sure 
	- This directory is intact
	- Your ~/.ssh config and ./hosts.yaml match for at least one target machine.
	- You have ./playbooks/docker.yaml and ./docker-compose.yaml on your machine.
3. Run (from this directory):
   (DIR: https://github.com/Orestis-Apostolou/crowdfunding-ansible/tree/main/ansible)
	- ansible-playbook ./playbook/docker.yaml
   Note: Make sure you have sudoless ssh set up for the target machine(s).
4. Application should now be exposed on port 80 of your machine (network configuration required).