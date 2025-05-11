package com.projetPOO.TR.demo.GestionReseau;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NetworkUtils {

    public static List<String> traceroute(String host) {
        List<String> result = new ArrayList<>();
        
        try {
            Process process;
            if (System.getProperty("os.name").startsWith("Windows")) {
                process = Runtime.getRuntime().exec("tracert " + host);
            } else {
                process = Runtime.getRuntime().exec("traceroute " + host);
            }
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            
            while ((line = reader.readLine()) != null) {
                result.add(line);
            }
            
            process.waitFor();
            reader.close();
            
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        
        return result;
    }
    /* 
    public static List<String> scanNetwork(String subnet) {
        List<String> activeHosts = new ArrayList<>();
        
        for (int i = 1; i <= 254; i++) {
            String host = subnet + "." + i;
            
            try {
                if (InetAddress.getByName(host).isReachable(1000)) {
                    activeHosts.add(host);
                }
            } catch (IOException e) {
                // Ignorer les hôtes qui ne répondent pas
            }
        }
        
        return activeHosts;
    }
    
    public static Map<String, String> getHostInfo(String host) {
        Map<String, String> info = new HashMap<>();
        
        try {
            InetAddress address = InetAddress.getByName(host);
            info.put("hostname", address.getHostName());
            info.put("ip", address.getHostAddress());
            
            // Récupérer l'adresse MAC (uniquement pour les hôtes locaux)
            if (address.isReachable(1000)) {
                String macAddress = getMacAddress(host);
                if (macAddress != null) {
                    info.put("mac", macAddress);
                }
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return info;
    }
    */
    private static String getMacAddress(String host) {
        try {
            Process process;
            if (System.getProperty("os.name").startsWith("Windows")) {
                process = Runtime.getRuntime().exec("arp -a " + host);
            } else {
                process = Runtime.getRuntime().exec("arp " + host);
            }
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            
            Pattern macPattern = Pattern.compile("([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})");
            
            while ((line = reader.readLine()) != null) {
                Matcher matcher = macPattern.matcher(line);
                if (matcher.find()) {
                    return matcher.group();
                }
            }
            
            process.waitFor();
            reader.close();
            
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        
        return null;
    }
}
  