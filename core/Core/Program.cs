using ElectronCgi.DotNet;
using System;
using System.Runtime.InteropServices;
using VideoPlayerController;

namespace Core
{
    class Program
    {
        static void Main(string[] args)
        {
            var connection = new ConnectionBuilder()
                .WithLogging()
                .Build();
            
            connection.On("master_volume_get", () => 
            {
                float volume = VideoPlayerController.AudioManager.GetMasterVolume();
                return $"master volume is {volume}";
            });

            connection.On("master_volume_set", (float value) => 
            {
                VideoPlayerController.AudioManager.SetMasterVolume(value);
                return $"master volume is now {value}";
            });

            connection.On("master_volume_step", (float step) => 
            {
                VideoPlayerController.AudioManager.StepMasterVolume(step);
                return $"Master volume stepped by {step}";
            });

            connection.On("master_volume_mute_get", () => 
            {
                bool muted = VideoPlayerController.AudioManager.GetMasterVolumeMute();
                if (muted == true) {
                    return "Master volume is muted";
                } else {
                    return "Master volume is not muted";
                }
            });

            connection.On("master_volume_mute_set", (bool isMuted) => 
            {
                VideoPlayerController.AudioManager.SetMasterVolumeMute(isMuted);
                string t = (isMuted == true ? "muted" : "unmuted");
                return $"master volume has been {t}";
            });

            connection.On("master_volume_mute_toggle", () => 
            {
                bool isMuted = VideoPlayerController.AudioManager.ToggleMasterVolumeMute();
                string t = (isMuted == true ? "muted" : "unmuted");
                return $"master volume is now {t}";
            });

            connection.On("get_pid_display_name", (int pid) => // Doesn't actually work for display name, just jumbled data
            {
                string[] f = VideoPlayerController.AudioManager.getVolumeObjectDisplayName(pid);
                string d = "";
                for (var i = 0; i < f.Length; i++)
                {
                    var dev = f[i];
                    d += $"{dev}, ";
                }
                return $"Display name is {d}";
            });

            connection.On("get_devices", (int pid) =>
            {
                string[] f = VideoPlayerController.AudioManager.getPossibleSourceDevices();
                string d = "";
                for (var i = 0; i < f.Length; i++)
                {
                    var dev = f[i];
                    d += $"{dev}, ";
                }
                return $"Display name is {d}";
            });

            string[] a = VideoPlayerController.AudioManager.getPossibleSourceDevices();
            string b = "";
            for (var i = 0; i < a.Length; i++)
            {
                var dev = a[i];
                b += $"{dev}, ";
            }
            Console.WriteLine($"Display name is {b}");

            connection.Listen();    
        }
    }
}