package net.grimeria.grimeriacore.commands;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class OpmeCommand implements CommandExecutor {

    @Override
    public boolean onCommand(CommandSender sender, Command command, String s, String[] strings) {
        if (sender instanceof Player player) {

            if (player.hasPermission("grimeria.op")) {

                if (player.isOp()) player.sendMessage("§cYou are already an Operator!");

                else {
                    player.setOp(true);
                    player.sendMessage("§aOperator mode enabled.");
                }

            } else player.sendMessage("§cYou don't have permission to execute this command!");

        }
        return true;
    }
}
