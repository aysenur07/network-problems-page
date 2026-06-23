// Network Problems Full Descriptions (Script)

const problems = [
    // Previous problems omitted for brevity
    // ... (previous problems 1-4 omitted for brevity)
    {
        id: 1,
        title: "IP Address Conflict", 
        layer: "(Layer 3-Network Layer)",
        description: "IP Address Conflict Issue occurs when two or more devices on a network try to use the same IP address. This situation can lead to communication disruptions between devices on the network, connection drops, and even complete unavailability of some devices",
        causes: [
          "Static IP Address Assignment:<p> When a device in a network uses a static IP address, and another device manually assigns the same IP address, a conflict arises. o  For example, if a computer in the network is assigned a static IP of 192.168.1.10, and another device tries to use the same IP, a conflict will occur.",
          "Dynamic IP Address Assignment (DHCP) reuse:<p>The DHCP server assigns dynamic IP addresses to devices. If the DHCP server gives the same IP to a device that was already manually assigned a static IP or reuses IP addresses incorrectly from its pool, a conflict can occur. o  In most networks, DHCP automatically assigns IP addresses, but misconfigurations in the process can lead to IP conflicts.",
          "DHCP Server Issues:<p>If there are multiple DHCP servers on a network and they do not share the IP pool, conflicts can arise. For example, if one DHCP server assigns IPs from 192.168.1.100 to 192.168.1.200 while another DHCP server uses the same range, conflicts will occur. ",
          "New Devices Added to the Network:<p>When a device’s IP address is dynamically assigned, a previously used but now removed device’s IP address could be reassigned to a new device, causing an IP conflict.",
          "Hardware Failures in the Network:<p> Hardware failures, particularly with the DHCP server, can also lead to IP conflicts. Similarly, misconfigurations in network cards or routers can cause conflicts." 
        ],
        symptoms: [
            "Connection Drops:<p> When a conflict occurs, devices on the network may fail to communicate properly, leading to dropped connections or very slow network speeds.",
            "Error Messages from Network Devices:<p> When a conflict is detected, some devices may display error messages. For instance, Windows devices might show error messages regarding network adapter IP conflicts.", 
            "Slow Performance:<p>Networks with IP conflicts may experience slower performance as devices cannot send packets to each other properly, increasing network congestion.",  
            "Network Services Not Working:<p> IP conflicts can cause network services to fail. For example, file sharing services or printers may become inaccessible due to the conflict."  
        ],
        solutions: [
            "Review Static IP Addresses: <p>When assigning static IP addresses to devices in the network, make sure they do not overlap with the DHCP pool. For example, assign static IPs in the range from 192.168.1.1 to 192.168.1.10, and let the other devices automatically receive IP addresses via DHCP.",
            "Proper IP Address Planning helps prevent conflicts on the network.",  
            "DHCP Server Configuration:<p>The DHCP server's IP pool should be correctly configured. The IP range assigned by the DHCP server should not overlap with the static IPs used in the network. Also, ensure that only one device manages the DHCP server.",  
            "Detecting IP Conflicts in the Network:<p>Devices with IP conflicts should be identified by network administrators, and their IP addresses should be manually changed. This can be done by checking the ARP cache (Address Resolution Protocol table) or using ping commands across the network.",  
            "DHCP Lease Duration: <p>The DHCP lease duration should be properly set. The lease duration determines how long a device can hold onto its assigned IP address. Shorter lease times can help release dynamic IPs more quickly and reduce conflict risks.",
            "Monitor Network Routers and Browsers:<p> By reviewing router log files, error messages related to conflicts can be detected. The router interface will show IP assignments and potential conflict details.", 
            "Update Network Hardware:<p> Regular software updates for network hardware, especially routers and switches, are important. These updates ensure that the devices operate with the most secure and stable configurations.",
            "Switch from Static IP to Dynamic IP:<p> If IP conflicts occur frequently, switching from static IP usage to dynamic IPs (DHCP) can help. This ensures that devices automatically receive IP addresses from the DHCP server, reducing the chances of conflicts."
            
        ],
        simulation: "In this simulation, pc13 and pc14 were given the same ip address. In this way, an ip conflict was simulated. The orange circles on the ports also indicate this..",
        conclusion: "Pc13 and Pc14 have different ip adresses (statically) on this simulation.  In this scenario ,there is not ip conflict. We pinged pc14's ip address from pc13. It seems to work correctly in the command prompt.",
        packetTracerFile: [
          "ip.conflict.pkt",
          "ip.conflictsolution.pkt"
        ],
         pdfUrl: "pdfs/problem1/NETWORK _PROBLEM_ 1IP.pdf"
      },
      {
        id: 2,
        title: "Double NAT",
        layer: "(Layer 3-Network Layer)",
        description: "Double NAT (Network Address Translation) occurs when two devices on the network (typically two routers) are both performing NAT independently. This results in two layers of address translation, which can lead to routing issues, broken services, and failure in communication between end devices. Understanding NAT briefly; NAT translates private IP addresses (like 192.168.x.x or 10.x.x.x) to public IP addresses before they are sent over the internet. Normally, only one NAT device should exist between the internal network and the internet.",

        causes: [
            "Multiple Routers Performing NAT:<p> If two routers are connected in series and both are configured to perform NAT, each one applies its own translation to the packet. Example: Router A NATs 10.0.0.1 → 192.168.1.2, then Router B NATs 192.168.1.2 → Public IP. This double translation creates a mapping confusion for returning packets.",
            "Improper Interface NAT Roles (inside/outside):<p>If the inside and outside interfaces are misconfigured or overlap incorrectly, NAT functionality fails and causes routing issues.",
            "Misconfigured Access Lists (ACLs):<p>When NAT is applied without correctly defining internal traffic via access lists, routers may not translate packets properly." 
            
        ],
        symptoms: [
            "Unsuccessful Ping Responses: <p>Devices behind the inner NAT router fail to communicate with devices beyond the second NAT boundary.",
            "Connectivity Drops:<p> Devices may get connected to the network but experience timeouts or DNS failures.", 
            "Inaccessible Services:<p> Remote desktop, VoIP, or P2P services may break or function inconsistently.",
            "Trouble with Port Forwarding:<p> Ports forwarded on the first router don’t work correctly due to translation by the second router." 
             
        ],
        solutions: [
          "Use only one NAT router:<p> Designate one router to perform NAT and configure the other to pass traffic transparently.For example, disable NAT on the upstream router and allow the downstream router to manage translations. ",
          "Enable bridge mode on the first router:<p> Set the first router to bridge or pass-through mode, disabling its NAT functionality.",
          "Ensure correct NAT roles (ip nat inside/outside): <p>Ensure: Inside interfaces use ip nat inside ,outside interfaces use ip nat outside, mismatch can cause double NAT or incorrect behavior. ",
          "Properly configure ACLs to guide NAT translation:<p> ACLs should correctly match internal IP subnets to guide the NAT process:access-list 1 permit 10.0.0.0 0.0.0.255  ,ip nat inside source list 1 interface FastEthernet0/0 overload "
        ],
        simulation: "Double NAT Problem Steps: Both routers are configured with NAT, each translating their own interface IPs. PC0 tries to ping 192.168.1.1 (Router0). returned timed out due to two layers of NAT: 10.0.0.10 → NAT to 192.168.1.2 (by Router1) o 	192.168.1.2 → NAT to 172.16.0.1 (by Router0) ",
        conclusion: "Double NAT is a common problem when using multiple routers. It causes serious connectivity issues due to conflicting translation layers. Proper NAT configuration, access list usage, and router interface role management are key to resolving the issue.",
        packetTracerFile: [
          "doublenatProblem.pkt",
          "doublenatsolution.pkt"
        ],
        pdfUrl:"pdfs/problem2/NETWORK_PROBLEM_2NAT.pdf"

      },
      {
        id: 3,
        title: "MAC Flooding",
        layer: "(Layer 2-Data Link Layer)",
        description: "MAC Flooding is a type of network attack where a switch's MAC address table is overwhelmed with fake MAC addresses, causing the switch to behave like a hub. This leads to serious security and performance issues in the network.",
        causes: [
            "Switch Table Limitations:<p> Switches maintain a MAC address table (CAM table) that maps MAC addresses to specific ports. This table has a finite size. o  An attacker sends frames with different source MAC addresses rapidly, exhausting the table’s capacity.", 
            "Malicious Attack Tools:<p> Tools like macof or Yersinia can generate thousands of fake MAC addresses per second. These tools are used by attackers to intentionally flood the switch.",
            "Lack of Port Security:<p>  If port security is not enabled on switch ports, the switch will learn and store unlimited MAC addresses from any source. This allows attackers to exploit the switch freely.",  
            "Poor Network Segmentation: <p>Networks that are flat and lack VLAN separation are more vulnerable to such broadcast-based attacks."  
        ],
        symptoms: [
          "Broadcast Behavior: <p>Once the MAC table is full, the switch starts broadcasting all incoming traffic to all ports. o  This compromises data privacy and allows attackers to sniff packets not intended for them.",  
          "Network Performance Degradation: <p>With excessive traffic being sent to all ports, network congestion increases. o  	Devices experience latency, dropped packets, or even total communication failure.",  
          "Unauthorized Access to Data: <p>Attackers can intercept sensitive data like login credentials or personal information from broadcast traffic.",
          "Unusual Traffic Patterns: <p>Network monitoring tools may detect a high volume of unknown MAC addresses and unexpected traffic on multiple switch ports." 

        ],
        solutions: [
            "Enable Port Security:<p> Configure port security on switches to limit the number of MAC addresses learned per port.  o 	Example: Limit each port to 1–2 allowed MAC addresses.", 
            "Use Static MAC Address Binding:<p> Bind known MAC addresses to specific switch ports. This prevents unknown devices from communicating through protected ports.",  
            "Implement VLANs: <p>Use Virtual LANs to logically segment the network.  o 	This minimizes the attack surface by isolating devices.",
            "MAC Address Table Monitoring:<p> Regularly monitor the MAC address table for anomalies.  Suspiciously high numbers of learned MAC addresses should trigger alerts.",
            "Use Managed Switches with Security Features:<p> Deploy switches that support features like Dynamic ARP Inspection (DAI), DHCP Snooping, and port-based authentication (802.1X).",
            "Intrusion Detection and Prevention Systems (IDS/IPS):<p> Use IDS/IPS to detect and block MAC flooding attacks in real-time.",  
            "Educate Network Users: <p>Awareness training for administrators and users helps reduce insider threats and misuse of network tools."
            
        ],
        simulation: ": In this simulation, 21 PCs were used to send pings to a target PC from 20 PCs. As a result, broadcast behavior, which is one of the symptoms of Mac flooding, was observed. ",
        conclusion: "Using first solution(Enable Port Security)",
        packetTracerFile: [
          "macfloodingProblem.pkt",
        ],
        pdfUrl:"pdfs/problem3/NETWORK_PROBLEM_3mac.pdf"
      },
      {

        id: 4,
        title: "Link Aggregation Errors",
        layer: "(Layer 2- Data Link Layer)",
        description: "Link Aggregation (also known as LACP – Link Aggregation Control Protocol) allows multiple physical links to be combined into one logical link to increase bandwidth and provide redundancy. However, misconfigurations and hardware incompatibilities can lead to network instability and performance degradation.  ",
        causes: [
            "Configuration Mismatch:<p>If the link aggregation settings between two connected devices (e.g., switches or a switch and a server) do not match, the LAG (Link Aggregation Group) will fail or become unstable. o  	Example: One side is set to LACP active, while the other is using static mode.",
            "Inconsistent Port Settings: <p>All ports in a LAG must have the same speed, duplex mode, and MTU (Maximum Transmission Unit) settings. Differences in these settings may prevent the link group from forming.",  
            "Hardware Incompatibility:<p> Not all network devices implement LACP in the same way. Link aggregation between different vendors can sometimes result in compatibility issues.",
            "Cable or Port Failures:<p> If one of the physical links in the LAG has a faulty port or damaged cable, it can lead to packet loss or link flapping. ",
            "Incorrect VLAN Configuration:<p> If VLAN tagging or trunking settings are inconsistent across the aggregated ports, some traffic may be blocked or misrouted.",  
            "Spanning Tree Protocol (STP) Conflicts: <p> Improper interaction between STP and LAG can cause ports to be blocked, resulting in unreachable devices or loops."
            
        ],
        symptoms: [
            "Uneven Traffic Distribution:<p> Traffic may not be evenly distributed across the links, leading to congestion on some links while others remain underutilized.", 
            "Connection Drops or Packet Loss: <p>If one link in the group fails and is not properly removed from the LAG, it may result in lost packets or intermittent connectivity.", 
            "Slow Network Performance:<p> Inefficient or broken aggregation can reduce available bandwidth and slow down communication between devices.",
            "LAG Not Forming: <p>The link aggregation group may fail to establish if configuration mismatches or incompatible settings exist.",
            "Network Loops: <p> Incorrectly configured LAGs can result in Layer 2 loops, which lead to broadcast storms and severe performance issues."
            
        ],
        solutions: [
            "Ensure Matching LACP Settings on Both Ends:<p> Use the same mode on both devices (e.g., LACP active on both sides or static mode on both). Example command on Cisco: channel-group 1 mode active.",
            "Align Port Configurations:<p> Make sure all ports in the LAG have identical settings for speed, duplex, and MTU.",
            "Check Hardware and Firmware Compatibility:<p> Verify that both devices support LACP and use the latest firmware versions for stability and bug fixes.",  
            "Test Physical Ports and Cables: <p>Replace damaged cables and test for faulty ports to ensure physical connectivity is solid.",
            "Standardize VLAN Configurations:<p> All ports within the LAG must have the same VLAN settings to properly carry tagged or untagged traffic.",
            "STP Integration: <p>Configure STP to recognize the LAG as a single logical link to avoid blocking individual ports in the group.",
            "Monitor Logs and Alerts:<p> Use system logs to detect LACP negotiation issues, dropped links, or error messages related to LAG. ",
            "Use Diagnostic Tools:<p> Commands like show etherchannel, show lacp neighbor, ping, and traceroute help in identifying misconfigurations or failures."

        ],
        simulation: "In this simulation, the link aggregation configuration problem was demonstrated (using CLI commands).",
        conclusion: "LACP configuration problem solved in this simulation. Necessary lacp settings were made (using cli commands).",
        packetTracerFile: [
          "lacpproblem.pkt",
          "lacpsolution.pkt"
        ],
        pdfUrl:"pdfs/problem4/NETWORK_PROBLEM_4.lac.pdf"
      },
    {
      id: 5,
      title: "DNS Poisoning / DNS Spoofing",
      layer: "(Layer 7 - Application Layer)",
      description: "DNS Poisoning, also known as DNS Spoofing, is a type of attack where a malicious actor inserts false DNS data into a DNS resolver’s cache. As a result, users are redirected to fraudulent websites instead of the legitimate ones, potentially leading to phishing, malware infections, or data theft.  ",
      causes: [
        "Compromised DNS Servers:<p> Attackers can gain access to DNS servers and inject malicious records directly.This affects all users relying on that server for DNS resolution. ",
        "Man-in-the-Middle (MITM) Attacks: <p>Attackers intercept DNS requests and send fake responses, redirecting users to malicious IP addresses. Typically occurs on unsecured networks (e.g., public Wi-Fi).", 
        "Software Vulnerabilities in DNS Services: <p>Bugs or outdated DNS server software may allow attackers to exploit and manipulate the cache. ", 
        "Lack of DNSSEC (DNS Security Extensions):<p> Without DNSSEC, DNS responses are not digitally signed, making it easier to spoof legitimate DNS replies.",  
        "Cache Poisoning Attacks:<p> Attackers flood a DNS server with fake responses before the legitimate response arrives, tricking the server into caching false data.",  
        "Infected Client Devices:<p> Malware on a user’s computer can change local DNS settings or modify the hosts file to redirect traffic."

      ],
      symptoms: [
        "Redirection to Fake Websites: <p>Users are taken to suspicious or unrelated websites when entering known domain names (e.g., bank login pages, email portals).", 
        "Security Certificate Warnings:<p> Browsers may display SSL certificate errors or security warnings, indicating the site does not match the certificate. ",
        "Unusual Network Behavior:<p> Unexpected redirects, slow browsing, or communication with unknown IP addresses can occur. ", 
        "Multiple Users Reporting the Same Issue: <p>Widespread DNS redirection problems usually suggest a compromised DNS server. ", 
        "Login Credential Theft or Malware Infection:<p> Users may unknowingly submit sensitive information to attackercontrolled websites or download malicious software. " 
  

      ],
      solutions: [
        	"Flush DNS Cache:<p> On affected machines, clear the DNS resolver cache to remove poisoned entries. Command (Windows): ipconfig /flushdns", 
            "Change to Trusted DNS Providers:<p> Use secure DNS services like Google DNS (8.8.8.8), Cloudflare DNS (1.1.1.1), or OpenDNS, which provide better protection and monitoring. ", 
            "Implement DNSSEC: <p>Enable DNS Security Extensions to verify the authenticity of DNS responses through digital signatures.",  
            "Keep DNS Software Updated:<p> Regularly patch and update DNS servers to fix known vulnerabilities. ",
            "Monitor DNS Traffic: <p>Use IDS/IPS tools and logs to detect unusual DNS activity or suspicious query responses. ",
	        "Secure Local Networks:<p> Encrypt DNS queries using DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT) to prevent MITM attacks. Avoid using public or unsecured Wi-Fi for sensitive transactions. ",
            "Educate Users on Phishing Risks:<p> Training users to spot suspicious URLs, certificate warnings, and phishing pages can reduce successful DNS poisoning exploits. ",
            "Restrict Access to DNS Settings: <p>Prevent unauthorized users or malware from modifying DNS settings on routers or endpoint devices. " 

      ],
      simulation: ": In this simulation, the IP of the given address was changed to a fake IP and when the real IP address was entered in the browser, the following image was encountered.",
      conclusion: "For the solution, the fake address (server2) was removed from the DNS server (server 0) and the real address(server1) was added instead .",
      packetTracerFile: [
        "dnsspoofingproblem.pkt",
        "dnsspoofingsolution.pkt"
      ],
      pdfUrl:"pdfs/problem5/NETWORK_PROBLEM_5dnsspof.pdf"
    }
    ,
    {
      id: 6,
      title: "IoT Network Security Issues",
      layer: "(Multi-layer)",
      description: "IoT (Internet of Things) Network Security Issues refer to vulnerabilities and risks associated with the growing number of interconnected smart devices. These devices often lack proper security controls, making them prime targets for attackers. Since IoT devices operate across multiple layers of the OSI model, their weaknesses can result in data theft, unauthorized access, and full-scale network compromise.",
      causes: [
        "Weak or Default Credentials:<p> Many IoT devices are shipped with factory-set usernames and passwords. o  	Users often fail to change these, allowing easy access for attackers using brute force or credential stuffing techniques. ",
        "Lack of Firmware Updates:<p> IoT devices frequently run outdated software. o  	Manufacturers may not provide updates, or users may neglect to apply them, leaving known vulnerabilities unpatched. ",
	    "Unencrypted Communication:<p> Data transmitted by IoT devices may not use secure protocols (e.g., HTTPS, TLS). o  	This makes it easier for attackers to intercept and manipulate data using packet sniffers or MITM attacks.",
        "Insecure Network Services:<p> Unnecessary open ports or services (e.g., Telnet, FTP) on devices increase the attack surface. Attackers exploit these services to gain unauthorized access. ",
        "Insufficient Authentication and Authorization: <p>Devices may lack proper user authentication or role-based access control. This allows unauthorized users to perform sensitive operations. ",
        "Lack of Device Monitoring and Logging:<p> Without proper logging, it's difficult to detect suspicious activity or track incidents. ",
        "Large Attack Surface: <p>The more devices connected to a network, the more entry points exist for an attacker. ",
        "Physical Access Vulnerability: <p>IoT devices often operate in uncontrolled or public environments. Attackers can tamper with the hardware to extract data or modify firmware." 

      ],
      symptoms: [
      	"Unauthorized Access to Devices:<p> Devices performing unexpected operations or configuration changes.",
        "Increased Network Traffic or Anomalies: <p>Sudden spikes in traffic from IoT devices, especially outbound traffic, can indicate botnet activity (e.g., DDoS attacks).",
        "Device Malfunctions or Downtime:<p> Infected or hijacked devices may crash, freeze, or stop functioning normally. ",
        "Suspicious External Connections:<p> IoT devices attempting to communicate with unknown or blacklisted IP addresses. ", 
        "Data Leaks: <p>Sensitive information (e.g., video feeds, sensor data) being accessed by unauthorized users or publicly exposed." 
        
      ],
      solutions: [
          "Change Default Credentials:<p> Immediately replace factory-set usernames and passwords with strong, unique credentials on all IoT devices.", 
	      "Apply Regular Firmware Updates:<p> Check for and install security patches from manufacturers. 	Consider disabling or replacing unsupported devices. ",
          "Isolate IoT Devices Using VLANs or Subnets: <p>Segment the network to limit IoT devices’ access to critical systems and data.  ",
          "Enable Encryption:<p> Use secure protocols like HTTPS, TLS, and WPA3 for wireless communication. ",
          "Disable Unused Services and Ports:<p> Close or block unnecessary network services to reduce the attack surface.  ",
          "Implement Network Access Control (NAC):<p> Only allow authenticated and authorized devices to connect to the network.  ",
          "Monitor Device Activity:<p> Use intrusion detection systems (IDS), firewalls, and monitoring tools to track and alert unusual behavior.  ",
          "Restrict Physical Access: <p>Install devices in secure locations or tamper-resistant enclosures.  ",
          "Use Secure IoT Platforms and Vendors: <p>Choose manufacturers that follow strong security practices and provide longterm support. ", 
          "Educate Users and Administrators: <p>Provide training on IoT risks and safe configuration practices.  "
   
      ],
      simulation: "A network was populated with numerous IoT devices, and segmentation using VLANs was applied to mitigate risk.",
      conclusion: "VLAN segmentation successfully reduced exposure by isolating IoT traffic from sensitive systems.",
      packetTracerFile: [
        "iotproblemsolution.pkt",
        
      ],
      pdfUrl:"pdfs/problem6/NETWORK _PROBLEM_6iot.pdf"
    }
  ,{
    id: 7,
      title: "Quantum Computing Impact on Network Security",
      layer: "(Layer 7 - Application Layer)",
      description: "Quantum Computing's Impact on Network Security refers to the potential risks and vulnerabilities that quantum computers pose to traditional cryptographic protocols used in securing networks. Quantum computing has the ability to solve complex mathematical problems that current cryptographic algorithms rely on, which could make traditional encryption methods obsolete.",
      causes: [
        "Breaking Classical Encryption Algorithms:<p> Quantum computers can efficiently solve problems like factoring large numbers or solving discrete logarithms much faster than classical computers. Algorithms like RSA, Diffie-Hellman, and ECC could be easily broken by quantum computers.",
        "Shor’s Algorithm:<p>	Quantum computers can leverage Shor's Algorithm to factor large integers exponentially faster than classical computers. This threatens RSA encryption, which relies on the difficulty of factoring large numbers as a security measure.",
        "Grover’s Algorithm:<p>	Grover’s Algorithm allows quantum computers to search through unsorted data faster than classical computers. This could make symmetric encryption methods like AES less secure by reducing their key strength (e.g., a 256-bit key could be effectively reduced to 128 bits in security). ",
        "Quantum Key Distribution (QKD): <p>QKD could be a potential solution to secure communications in a quantum world. It allows two parties to share a secret key using quantum mechanics, but it’s still an emerging technology that requires specialized infrastructure and may not be widely adopted in the short term.",
        "Post-Quantum Cryptography: <p>	Quantum computing calls for a new class of cryptographic algorithms that are resistant to quantum attacks. However, transitioning to post-quantum cryptography (PQC) will take time and may introduce its own set of challenges, especially in terms of backward compatibility and performance.",
        "Lack of Readiness for Quantum Threats: o	Most current networking and encryption protocols are not designed to withstand quantum threats. The transition to quantum-resistant systems may require significant updates to existing systems and software, leading to vulnerabilities during the transition period. "
      ],
      symptoms: [
         "Increased Vulnerability to Data Breaches:<p> Network communications that rely on current encryption methods could be easily decrypted by quantum computers, leading to unauthorized access and potential data theft.",
	     "Decreased Trust in Secure Communications: <p>If quantum computers can break encryption algorithms used for secure transactions (e.g., banking, e-commerce), users may lose trust in online systems, impacting both business and consumer confidence.", 
         "Delayed Communication Due to Post-Quantum Cryptography Implementation:<p> Implementing post-quantum cryptography solutions may result in performance degradation or latency issues in securing communication channels, especially if these new algorithms are not yet optimized.", 
         "Legacy Systems Exposed to Quantum Attacks: <p>Many legacy systems still rely on outdated encryption algorithms (e.g., RSA, SHA) that will be easily broken by quantum computers. These systems will remain vulnerable until updated with quantum-resistant cryptography."
 
      ],
      solutions: [
        "Adopt Post-Quantum Cryptography: <p>Begin transitioning to post-quantum cryptography standards as they become available. This includes adopting algorithms that are resistant to quantum decryption techniques such as lattice-based encryption, hashbased signatures, or code-based cryptography.",
        "Use Quantum Key Distribution (QKD):<p> Explore the implementation of Quantum Key Distribution for secure key exchange between parties, ensuring that communications remain private and secure even in the age of quantum computing.",
        "Prepare for Hybrid Cryptography Models:<p> Use a hybrid model combining classical and post-quantum cryptographic algorithms to maintain compatibility with current systems while preparing for future quantum threats.",
        "Educate and Train Security Professionals:<p> Security teams should be educated on quantum computing's potential impact and the steps necessary to implement quantum-resistant encryption systems. Training should also include how to manage the risks posed by quantum computing.", 
        "Collaborate with Standards Organizations:<p> Work with organizations such as NIST (National Institute of Standards and Technology) that are developing standards for post-quantum cryptography to stay ahead of the curve and implement new algorithms in a timely manner.",
        "Monitor Advancements in Quantum Computing:<p> Stay informed about developments in quantum computing technology. Being aware of advancements allows security teams to proactively update cryptographic protocols before quantum computers become capable of breaking existing encryption.",
        "Upgrade Infrastructure for Post-Quantum Readiness:<p> Begin evaluating and upgrading infrastructure to support quantumresistant protocols. This may involve hardware changes to support new encryption algorithms or upgrading communication protocols to incorporate quantum-safe technologies." 

    
      ],
      simulation: "Simulation of quantum computing capabilities breaking current encryption algorithms and transitioning networks to quantum-resistant cryptography.",
      conclusion: "Preparing and upgrading to post-quantum cryptography standards and infrastructure is essential to maintain network security in the quantum era.",
      pdfUrl:"pdfs/problem7/NETWORK_PROBLEM_7.pdf"
    } ,
     {
        id: 8,
        title: "FIREWALL AND PORT BLOCKING ISSUES",
        layer: "(LAYER 3-4 – NETWORK AND TRANSPORT LAYER)",
        description: `Firewall and Port Blocking Issues refer to problems that arise when firewalls or network configurations block legitimate traffic or prevent access to certain services due to improper or restrictive port blocking. Firewalls are designed to protect networks by controlling incoming and outgoing traffic, but misconfigured firewall rules or port settings can lead to communication disruptions and impact network performance.`,
        causes: [
          "Misconfigured Firewall Rules: <p>Improperly set up firewall rules can block necessary communication between devices or applications. For example, allowing only certain IP addresses or services while blocking others may prevent access to legitimate network resources.",
          "Overly Restrictive Port Blocking:<p> Some firewalls block ports that are commonly used for critical services (e.g., HTTP port 80, HTTPS port 443). If these ports are incorrectly blocked, legitimate traffic cannot pass, causing services to become unavailable.",
          "Port Forwarding Errors: <p>In cases where network devices (e.g., routers) are configured to forward certain ports to specific servers, misconfigurations can prevent traffic from reaching its intended destination. For example, not forwarding port 8080 for a web application could make the application inaccessible.",
          "Intrusion Detection and Prevention Systems (IDPS) Blocking:<p> An IDPS may misinterpret legitimate traffic as malicious activity, leading to false positives and blocking network connections unnecessarily.",
          "Blocked VPN or Remote Access Connections: <p>Firewalls often block the ports used by Virtual Private Networks (VPNs) or remote access protocols. This could prevent remote workers from connecting to a corporate network securely, especially when using protocols like PPTP, L2TP, or OpenVPN.",
          "Dynamic IP Addressing and Port Blocking: <p>Devices that use dynamic IP addresses may have trouble maintaining a consistent connection if the firewall blocks ports dynamically assigned to them. This can cause intermittent connectivity issues.",
          "Application Layer Protocol Conflicts:<p> Some applications rely on specific ports to function properly. If these ports are blocked by the firewall, applications may fail to connect or operate correctly. For example, VoIP applications need specific ports to establish communication, and blocking those ports could prevent calls from being made."
        ],
        symptoms: [
          "Inability to Access Services or Websites:<p> Users may not be able to access specific websites or services due to blocked ports, such as not being able to reach an HTTP or HTTPS website if port 80 or 443 is blocked.",
          "Slow Network Performance: <p>Restricted communication due to blocked ports can cause delays in network performance, especially for applications that require open ports for communication.",
          "Connection Drops or Timeouts:<p> Firewalls blocking necessary ports can cause connections to drop or result in timeouts when trying to access services. This is common with VPN or remote desktop connections.",
          "Network or Application Errors:<p> Applications that depend on open ports for communication may show error messages indicating network connectivity issues or unable-to-connect errors.",
          "Failed Remote Access:<p> Remote users trying to access the network via VPN or remote desktop may experience failures to connect if firewall rules or port blocking prevent these protocols from functioning."
        ],
        solutions: [
          "Review and Adjust Firewall Rules:<p> Verify and adjust firewall rules to ensure that only the necessary traffic is blocked while legitimate traffic is allowed. Open the required ports for essential services and applications.",
          "Check Port Availability:<p> Ensure that critical ports (e.g., 80, 443 for HTTP/HTTPS) are not accidentally blocked. If specific ports are needed for custom applications, make sure they are explicitly allowed in the firewall configuration.",
          "Configure Proper Port Forwarding:<p> Set up proper port forwarding on routers or firewalls to ensure that traffic can reach the intended server. For example, if a web server is running on port 8080, configure port forwarding for that port.",
          "Review Intrusion Detection Systems (IDS/IPS):<p> Check the IDS/IPS settings to ensure that legitimate traffic is not being misclassified as malicious. Adjust sensitivity levels to reduce false positives while ensuring actual threats are detected.",
          "Enable VPN and Remote Access Ports:<p> Verify that the firewall is configured to allow VPN traffic and remote access protocols (e.g., PPTP, L2TP, OpenVPN) to pass through the necessary ports.",
          "Implement Network Segmentation: <p>Segment networks into zones based on security needs (e.g., create DMZs for public-facing services). This can help ensure that port blocking does not interfere with critical internal services.",
          "Use Port Scanners to Detect Blocked Ports:<p> Use network tools like port scanners to test for open or blocked ports. This can help identify any misconfigurations in the firewall or port forwarding settings.",
          "Monitor Network Logs: <p>Regularly review firewall and network device logs to identify blocked traffic or unusual activity. Logs can provide valuable information on why certain connections are being blocked.",
          "Update Firmware and Software:<p> Ensure that firewalls, routers, and network devices are running the latest firmware and software updates. This can help resolve known issues and improve performance.",
          "Test Changes in a Controlled Environment: <p>Before making changes to firewall configurations, test new rules in a lab or staging environment to minimize disruptions to the production network."
        ],
        simulation: "Use port scanning tools like Nmap or online services to identify blocked or open ports. Configure firewall rules step by step and observe effects on service accessibility. Monitor logs for blocked traffic.",
        conclusion: "Proper firewall and port configuration ensures smooth network communication, improves application reliability, and enhances overall network security without unnecessary access restrictions.",
        pdfUrl:"pdfs/problem8/NETWORK PROBLEM 8.pdf"
      },
      {
        id: 9,
        title: "TCP CONGESTION",
        layer: "(LAYER 4 – TRANSPORT LAYER)",
        description: `TCP Congestion occurs when a network experiences excessive data transmission, leading to network congestion and delays in data delivery. The Transmission Control Protocol (TCP) is designed to ensure reliable data delivery across networks, but when there is too much traffic, congestion occurs, resulting in packet loss, delay, and lower throughput. This can negatively impact the performance of network applications and services.`,
        causes: [
          "Excessive Data Transmission:<p> When too many devices or applications send data over the network simultaneously, the available bandwidth is overwhelmed, leading to congestion. For example, if multiple users are streaming videos or downloading large files at once, the network might become congested.",
          "Limited Bandwidth:<p> When the available bandwidth is insufficient for the amount of traffic generated, congestion occurs. This is particularly common in networks with limited internet speeds or in shared networks where multiple users compete for the same bandwidth.",
          "Network Latency:<p> High network latency can exacerbate congestion issues. Delays in the transmission of packets between devices or network hops can result in slower acknowledgments and increased retransmissions, which further contribute to congestion.",
          "Packet Loss:<p> When packets are lost due to network congestion, TCP must retransmit them, which consumes additional bandwidth and increases network congestion. This loss can occur in scenarios where buffer sizes in routers and switches are exceeded.",
          "TCP Window Size Mismanagement:<p> TCP uses a sliding window mechanism to manage data flow. If the window size is too large, it can cause congestion by overwhelming the receiving device. Similarly, if the window size is too small, it can cause underutilization of the available bandwidth.",
          "Queue Overflow in Routers and Switches:<p> Routers and switches on a network often use queues to temporarily hold packets before forwarding them. If the queues are too small or there is too much incoming traffic, the packets may be dropped, causing congestion and delays.",
          "Insufficient Flow Control Mechanisms:<p> TCP flow control mechanisms are designed to regulate data transmission rates between sender and receiver. If these mechanisms are not properly configured or are unable to keep up with the flow of data, congestion can result.",
          "Network Topology and Routing Issues:<p> Poorly designed or inefficient network topologies and routing paths can contribute to congestion. Suboptimal routes or network bottlenecks may cause certain links to become overloaded, leading to congestion in specific segments of the network."
        ],
        symptoms: [
          "Increased Latency: <p>A significant rise in network delays or lag, especially in applications requiring real-time communication (e.g., video conferencing, online gaming), can be a sign of TCP congestion.",
          "Packet Loss:<p> Frequent packet drops can indicate congestion, as packets are dropped when routers or switches are unable to forward them due to overwhelmed buffers.",
          "Slow Data Transfers: <p>File transfers, downloads, or web browsing may experience delays or reduced speeds, especially when TCP is trying to recover lost packets and retransmit them.",
          "Connection Timeouts or Retransmissions:<p> Increased timeouts or retransmissions of lost packets can be observed during TCP sessions, leading to lower throughput and poor application performance.",
          "Network Congestion Indicators:<p> The presence of jitter (variation in packet arrival time) and high packet retransmission rates are common indicators of TCP congestion, impacting the reliability of communication."
        ],
        solutions: [
          "Increase Bandwidth: <p>Increase the available network bandwidth to handle more traffic and reduce congestion. This can be done by upgrading network infrastructure, such as increasing the internet link speed or deploying additional network resources.",
          "Implement Traffic Shaping and Quality of Service (QoS): <p>Use traffic shaping and QoS techniques to prioritize critical traffic (e.g., VoIP, video conferencing) over less critical traffic (e.g., file downloads, web browsing). This helps prevent congestion in high-priority applications.",
          "Optimize TCP Window Size:<p> Adjust the TCP window size to better match the available bandwidth and latency. Larger windows allow for faster data transfer, while smaller windows help prevent congestion by controlling the flow of data.",
          "Apply Congestion Control Algorithms: <p>Modern TCP congestion control algorithms (e.g., TCP Reno, TCP CUBIC) dynamically adjust the transmission rate to avoid congestion. Tuning these algorithms can help optimize the response to congestion.",
          "Deploy Load Balancing:<p> Use load balancing techniques to distribute traffic evenly across multiple paths, preventing congestion in specific parts of the network. This is especially useful in data centers or cloud environments where multiple servers handle traffic.",
          "Monitor Network Traffic:<p> Regularly monitor network traffic to identify congestion points and take corrective action. Tools such as SNMP monitoring, NetFlow, and packet sniffers can help identify where congestion occurs.",
          "Network Topology Improvements: <p>Improve network design and routing protocols to avoid bottlenecks. Redesigning the network topology to ensure that traffic is routed optimally can help avoid congestion.",
          "Increase Buffer Size in Routers and Switches: <p>Increase the buffer size on network devices such as routers and switches to accommodate more traffic. This can prevent packet loss and reduce the need for retransmissions.",
          "Enable ECN (Explicit Congestion Notification):<p> Enable ECN on network devices to signal congestion without dropping packets. This allows the sender to adjust its transmission rate and avoid further congestion.",
          "Implement Adaptive Transmission Rates:<p> Implement adaptive transmission rates that adjust based on the current network conditions. For example, TCP can adjust its sending rate based on real-time feedback from network devices to avoid congestion."
        ],
        simulation: "Use network monitoring and congestion simulation tools to generate high traffic loads and observe the effects of congestion. Simulate bandwidth increases and apply congestion control algorithms to observe improvements.",
        conclusion: "Proper management of TCP congestion results in more efficient data transmission, improved network performance, and better user experience for applications requiring reliable and timely communication.",
        packetTracerFile: [
          "tcpcongestşonp.pkt",
        ],
        pdfUrl:"pdfs/problem9/NETWORK_PROBLEM_9tcpp.pdf"
      },
      {
        id: 10,
        title: "UDP PACKET LOSS",
        layer: "(LAYER 4 – TRANSPORT LAYER)",
        description: `UDP (User Datagram Protocol) is a connectionless transport layer protocol that does not guarantee reliable delivery of data packets. While this makes UDP more efficient and faster for certain types of communication (e.g., real-time applications), it also makes it vulnerable to packet loss. UDP does not have built-in mechanisms for retransmitting lost packets or ensuring that packets are received in the correct order.`,
      
        causes: [
          "Network Congestion:<p> When the network is congested and devices are overwhelmed with traffic, routers and switches may drop UDP packets to manage the load. Unlike TCP, UDP does not retransmit lost packets.",
          "Insufficient Bandwidth:<p> Lack of sufficient bandwidth to handle UDP traffic volume causes packet drops. UDP lacks flow control mechanisms unlike TCP.",
          "Buffer Overflow:<p> Routers and switches with full buffers discard incoming UDP packets.",
          "Packet Size and Fragmentation:<p> Large UDP packets exceeding MTU require fragmentation; if any fragment is lost, the whole packet is discarded.",
          "Routing Issues: <p>Misconfigured routing tables can misdirect or drop UDP packets as UDP lacks acknowledgement mechanisms.",
          "Network Hardware Failures:<p> Faulty routers, switches, or cables may cause packet loss.",
          "High Latency or Jitter:<p> Delays and jitter in the network can cause UDP packets to arrive late or be dropped, harming real-time apps."
        ],
      
        symptoms: [
          "Audio/Video Quality Degradation: <p>Choppy or frozen video and poor audio in VoIP or streaming apps.",
          "Latency and Delay: <p>Increased delays affecting real-time communications like gaming or live streams.",
          "Error Messages: <p>Application-level errors such as 'connection lost' or 'network error'.",
          "Application Failures:<p> Real-time apps failing or performing poorly due to packet loss."
        ],
      
        solutions: [
          "Network Optimization:<p> Increase bandwidth, reduce congestion, and improve routing with traffic shaping and QoS.",
          "Reducing Packet Size:<p> Avoid fragmentation by sending smaller UDP packets.",
          "Increasing Buffer Sizes:<p> Expand buffers on routers and switches to reduce packet drops.",
          "Monitoring Network Performance:<p> Use tools to detect congestion, jitter, and packet loss for timely action.",
          "Using Forward Error Correction (FEC): <p>Add redundancy to data to recover lost packets in real-time streams.",
          "Application-Level Retransmission:<p> Implement custom retransmission or recovery methods at the application layer.",
          "Improving Network Reliability:<p> Maintain and upgrade hardware to minimize failures.",
          "Using UDP-based Protocols with Reliability Features:<p> Use protocols like RTP that add error handling on top of UDP."
        ],
      
        simulation: `Use network monitoring tools to observe packet loss rates under high UDP traffic conditions. Simulate varying bandwidth and latency to analyze impacts and test solutions like packet size reduction and FEC.`,
      
        conclusion: `Proper management of UDP packet loss leads to improved real-time application performance, higher data transmission efficiency, and better user experience in latency-sensitive communications.`,
        pdfUrl:"pdfs/problem10/NETWORK PROBLEM 10.pdf"     
      }
      
    ];
    window.addEventListener("DOMContentLoaded", () => {
      const sidebar = document.getElementById("sidebar");
      const toggleBtn = document.getElementById("toggleBtn");
      const openSidebarBtn = document.getElementById("openSidebarBtn");
      const main = document.getElementById("main");
      const toc = document.getElementById("toc");
      const container = document.getElementById("problem-container");
    
      // Menü aç/kapa butonu
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.add("collapsed");
        openSidebarBtn.classList.remove("hidden");
        main.classList.add("full");
      });
      openSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("collapsed");
        openSidebarBtn.classList.add("hidden");
        main.classList.remove("full");
      });
      // Her problem için içerik ve bağlantı oluştur
      problems.forEach((problem, index) => {
        const id = `problem-${index + 1}`;
    
        // Kenar menü (TOC) bağlantısı
        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = `Problem ${index + 1}`;
        toc.appendChild(link);
    
        // Ana içerik
        const section = document.createElement("section");
        section.className = "problem";
        section.id = id;
        section.innerHTML = `
          <h2>${problem.title} <span class="layer">${problem.layer}</span></h2>
          <p><strong>Description:</strong> ${problem.description}</p>
          <p><strong>Causes:</strong></p>
          <ul>${problem.causes.map(cause => `<li>${cause}</li>`).join("")}</ul>
          <p><strong>Symptoms:</strong></p>
          <ul>${problem.symptoms.map(sym => `<li>${sym}</li>`).join("")}</ul>
          <p><strong>Solutions:</strong></p>
          <ul>${problem.solutions.map(sol => `<li>${sol}</li>`).join("")}</ul>
          <p><strong>Simulation:</strong> ${problem.simulation}</p>
          <p><strong>Conclusion:</strong> ${problem.conclusion}</p>
          
        `;
        if (problem.pdfUrl) {
          const pdfLink = document.createElement("a");
          pdfLink.href = problem.pdfUrl;
          pdfLink.target = "_blank"; // Yeni sekmede açar
          pdfLink.rel = "noopener noreferrer";
          pdfLink.textContent = "view PDF file ";
          pdfLink.className = "download-link";
          section.appendChild(pdfLink);
        }
        
        if (Array.isArray(problem.packetTracerFile)) {
          problem.packetTracerFile.forEach((fileName, index) => {
            const downloadLink = document.createElement("a");
            downloadLink.href = `simulations/${fileName}`;
            downloadLink.textContent = `▶ Simülation ${index + 1} dowloand (.pkt)`;
            downloadLink.download = fileName;
            downloadLink.className = "download-link";
            section.appendChild(downloadLink);
          });
        }
        
        
        const imageCount = 4; // kaç resim varsa burada belirt
        for (let i = 1; i <= imageCount; i++) {
          const imageName = `${problem.title.toLowerCase().replaceAll(" ", "_").replaceAll("/", "")}_${i}.png`;
          const imagePath = `images/${imageName}`;
          
          const img = new Image();
          img.onload = () => {
            img.alt = `${problem.title} Simulation ${i}`;
            img.className = "problem-image";
            section.appendChild(img);
          };
          img.onerror = () => {
            console.warn(`Resim bulunamadı: ${imagePath}`);
          };
          img.src = imagePath;
        }
        

        container?.appendChild(section);
      });
    });
    