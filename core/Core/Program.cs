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
            
            connection.On("master_volume_get", (string v) => 
            {
                float volume = VideoPlayerController.AudioManager.GetMasterVolume();
                return $"master volume is {volume}";
            });
            
            connection.Listen();    
        }
    }
}