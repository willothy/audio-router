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
            
            connection.On("master_volume", (string volume) => 
            {
                VideoPlayerController.AudioManager.SetMasterVolume(float.Parse(volume));
                return $"Set master volume to {volume}";
            });
            
            connection.Listen();    
        }
    }
}