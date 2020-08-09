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

            connection.On("master_volume_set", (string value) => 
            {
                VideoPlayerController.AudioManager.SetMasterVolume(Float.parse(value));
                return $"master volume is {value}";
            });

            connection.On("master_volume_step", (float step) => 
            {
                VideoPlayerController.AudioManager.StepMasterVolume(step);
                return $"Master volume stepped by {value}";
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
            
            connection.Listen();    
        }
    }
}