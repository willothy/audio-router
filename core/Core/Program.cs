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
            //AudioManager.SetMasterVolume(0.0);
            var connection = new ConnectionBuilder()
                .WithLogging()
                .Build();
            
            connection.On("greeting", (string name) => 
            {
                return $"Hello {name} from C#";
            });
            
            connection.Listen();    
        }
    }
}