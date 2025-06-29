Jenkins - Crowdfunding

This README explains how the Jenkins pipeline automates running Ansible playbooks to deploy both backend and frontend services.

1.Make sure your Jenkins server has:
    1.Ansible installed and configured.
    2.Access (SSH keys) to the target machines.
    3.The project repository cloned or accessible in the Jenkins workspace.

2.Create a Jenkins pipeline job and use the following pipeline script: https://github.com/Orestis-Apostolou/crowdfunding-ansible/blob/main/ansible.Jenkinsfile

3.Run the Jenkins job to deploy both backend and frontend using the respective Ansible playbooks.