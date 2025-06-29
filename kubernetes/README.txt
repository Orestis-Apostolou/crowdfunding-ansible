K8S - Crowdfunding
------------------

This README contains information on how to set up crowdfunding frontend
and backend on the same device and make it publically available using kubectl.

1. Install & Set up k8s or microk8s on a machine.
2. Copy this directory's contents into a folder in said machine.
   (DIR: https://github.com/Orestis-Apostolou/crowdfunding-ansible/tree/main/kubernetes)
	Required files:
	- backend-deployment.yaml
	- backend-svc.yaml
	- frontend-configmap.yaml
	- frontend-deployment.yaml
	- frontend-svc.yaml
	- frontend-ingress.yaml
3. Using kubectl run 'kubectl apply -f <filename>' for all the above files in that
   specific order (IMPORTANT).
4. Application should now be exposed on port 80 of your machine (network configuration required).
